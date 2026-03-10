"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

// Emscripten (MediaPipe WASM) pipes C++ INFO logs to stderr (console.error by default).
// These often happen asynchronously via web workers, so we intercept globally at the module level
// to prevent Next.js's dev overlay from redboxing on a successful XNNPACK init string.
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleInfo = console.info;
  const originalConsoleLog = console.log;

  const interceptor = (originalMethod: Function) => (...args: any[]) => {
    const msg = args.map(a => String(a)).join(" ");
    if (
      msg.startsWith("INFO:") ||
      msg.includes("Created TensorFlow Lite XNNPACK delegate") ||
      msg.includes("Feedback manager requires a model")
    ) {
      return;
    }
    originalMethod(...args);
  };

  console.error = interceptor(originalConsoleError);
  console.warn = interceptor(originalConsoleWarn);
  console.info = interceptor(originalConsoleInfo);
  console.log = interceptor(originalConsoleLog);
}

interface FaceTrackerProps {
  onFaceDetected?: (result: any) => void;
  onGazeChange?: (isValidated: boolean) => void;
  width?: number;
  height?: number;
  showOverlay?: boolean;
}

export default function FaceTracker({
  onFaceDetected,
  onGazeChange,
  width = 640,
  height = 480,
  showOverlay = false
}: FaceTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Keep a ref to the landmarker so we can use it in the animation frame
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  // Keep timestamp to sync video frame with inferencing
  const lastVideoTimeRef = useRef(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use refs for callbacks to prevent infinite re-render loops from new function identities
  const onFaceDetectedRef = useRef(onFaceDetected);
  const onGazeChangeRef = useRef(onGazeChange);

  useEffect(() => {
    onFaceDetectedRef.current = onFaceDetected;
    onGazeChangeRef.current = onGazeChange;
  }, [onFaceDetected, onGazeChange]);

  // Calculate Head Pose (Yaw, Pitch, Roll) from specific landmarks
  const calculateHeadPose = (landmarks: any[]) => {
    if (!landmarks || landmarks.length < 468) return null;

    // Simplified extraction based on key points
    // Center of face, left eye, right eye, nose tip
    // We'll calculate a basic heuristic for demo purposes

    // Nose tip
    const nose = landmarks[1];
    // Left eye center
    const leftEye = landmarks[159];
    // Right eye center
    const rightEye = landmarks[386];

    // Basic heuristic to determine yaw (left/right)
    // If the distance from nose to left eye is much smaller than nose to right eye -> turned left
    const noseToLeftX = Math.abs(nose.x - leftEye.x);
    const noseToRightX = Math.abs(nose.x - rightEye.x);

    // Normalize ratio between -1 (full left) and 1 (full right)
    const ratioX = (noseToLeftX - noseToRightX) / (noseToLeftX + noseToRightX);
    const yawAngle = ratioX * 90; // rough translation to degrees

    // Pitch (up/down) - simplistic approach using vertical distances
    // Compare nose-to-eyes vs nose-to-mouth (landmark 14 is lower lip)
    const mouth = landmarks[14];
    const noseToEyesY = Math.abs(nose.y - leftEye.y);
    const noseToMouthY = Math.abs(nose.y - mouth.y);
    const ratioY = (noseToMouthY - noseToEyesY) / (noseToMouthY + noseToEyesY);
    const pitchAngle = ratioY * 90; // rough translation

    return { yaw: yawAngle, pitch: pitchAngle };
  };

  const predict = useCallback(() => {
    if (!videoRef.current || !landmarkerRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ensure video has loaded data before inferencing
    if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (showOverlay) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }

      const currentTimeScale = performance.now();

      // MediaPipe requires the timestamp to be STRICTLY monotonically increasing.
      if (lastVideoTimeRef.current !== currentTimeScale) {
        lastVideoTimeRef.current = currentTimeScale;

        try {
          // Send current frame to MediaPipe. The logs are intercepted globally.
          const results = landmarkerRef.current.detectForVideo(video, currentTimeScale);

          if (onFaceDetectedRef.current) {
            onFaceDetectedRef.current(results);
          }

          if (ctx && results.faceLandmarks && results.faceLandmarks.length > 0) {
            // Always compute gaze, regardless of whether the overlay is shown
            const firstLandmarks = results.faceLandmarks[0];
            const pose = calculateHeadPose(firstLandmarks);
            const isLookingAtScreen = pose ? (Math.abs(pose.yaw) < 25 && Math.abs(pose.pitch) < 15) : false;

            if (onGazeChangeRef.current) {
              onGazeChangeRef.current(isLookingAtScreen);
            }

            if (showOverlay) {
              const drawingUtils = new DrawingUtils(ctx);
              for (const landmarks of results.faceLandmarks) {
                // Set dynamic colors based on validation
                const activeColor = isLookingAtScreen ? "#00FF00" : "#FF0000";
                const meshColor = isLookingAtScreen ? "#00FF0070" : "#FF000070";

                drawingUtils.drawConnectors(
                  landmarks,
                  FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                  { color: meshColor, lineWidth: 1 }
                );
                drawingUtils.drawConnectors(
                  landmarks,
                  FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                  { color: activeColor, lineWidth: 2 }
                );
                drawingUtils.drawConnectors(
                  landmarks,
                  FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                  { color: activeColor, lineWidth: 2 }
                );
                drawingUtils.drawConnectors(
                  landmarks,
                  FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                  { color: activeColor, lineWidth: 2 }
                );

                // Calculate and display artificial Gaze/Pose metrics
                if (pose) {
                  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                  ctx.fillRect(10, 10, 240, 100);
                  ctx.fillStyle = "white";
                  ctx.font = "16px monospace";
                  ctx.fillText(`Yaw:   ${pose.yaw.toFixed(1)}°`, 20, 35);
                  ctx.fillText(`Pitch: ${pose.pitch.toFixed(1)}°`, 20, 55);

                  ctx.fillStyle = activeColor;
                  ctx.font = "bold 18px monospace";
                  ctx.fillText(isLookingAtScreen ? "✅ GAZE VALIDATED" : "❌ GAZE LOST", 20, 85);
                }
              }
            }
          } else {
            // No faces detected this frame
            if (onGazeChangeRef.current) {
              onGazeChangeRef.current(false);
            }
          }
        } catch (inferenceError) {
          console.warn("MediaPipe Inference skipped a frame or threw:", inferenceError);
        }
      }
    }

    animationFrameIdRef.current = requestAnimationFrame(predict);
  }, [showOverlay]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const initializeMediaPipe = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "/wasm"
        );
        landmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `/models/face_landmarker.task`,
            delegate: "GPU" // Restoring GPU delegate since zero-size video context was the root cause
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1 // Optimize for the single passenger
        });

        setIsLoaded(true);

        // Start Webcam
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: width },
            height: { ideal: height },
            facingMode: "user" // front-facing camera
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadeddata", () => predict());
        }

      } catch (err: any) {
        console.error("Failed to initialize FaceTracker:", err);
        setError(err.message || "Failed to access camera or model.");
      }
    };

    initializeMediaPipe();

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }
    };
  }, [width, height, predict]);

  return (
    <div className="relative" style={{ width, height }}>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 text-white p-4 text-center z-50">
          <p>Error: {error}</p>
        </div>
      )}

      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-400 z-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3" />
          Loading AI Model...
        </div>
      )}

      {/* Hidden video element feeding the model */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
      />

      {/* Visual output canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg border border-white/10"
        width={width}
        height={height}
      />
    </div>
  );
}
