import { useState, useEffect, useRef } from "react";

export interface ImpressionMetrics {
    totalImpressions: number;
    currentDwellTime: number;
    currentAttentionTime: number;
    status: "IDLE" | "TRACKING";
}

const SPATIAL_TOLERANCE = 0.15;

export function useImpressionTracker(
    faceLandmarksArray: any[],
    isGazeValidated: boolean,
    adSessionId: string
): ImpressionMetrics {
    const [totalImpressions, setTotalImpressions] = useState(0);
    const [currentDwellTime, setCurrentDwellTime] = useState(0);
    const [currentAttentionTime, setCurrentAttentionTime] = useState(0);
    const [status, setStatus] = useState<ImpressionMetrics["status"]>("IDLE");

    // Refs for exact millisecond tracking
    const stateRef = useRef({
        status: "IDLE" as ImpressionMetrics["status"],
        dwellStart: 0,
        attentionStart: 0,
        accumulatedAttention: 0,
    });

    const inputsRef = useRef({ faceLandmarksArray, isGazeValidated, adSessionId });
    
    // Spatial memory restricted to the current ad session
    const activeAdSessionRef = useRef(adSessionId);
    const countedFacesInSessionRef = useRef<{ x: number, y: number }[]>([]);

    useEffect(() => {
        inputsRef.current = { faceLandmarksArray, isGazeValidated, adSessionId };
    }, [faceLandmarksArray, isGazeValidated, adSessionId]);

    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            const now = Date.now();
            const st = stateRef.current;
            const inputs = inputsRef.current;

            // 1. Detect Ad Session boundaries to wipe impression spatial memory
            if (inputs.adSessionId !== activeAdSessionRef.current) {
                activeAdSessionRef.current = inputs.adSessionId;
                countedFacesInSessionRef.current = []; // Wipe memory for new ad loop!
            }

            // 2. Impression Logic (Triggered purely by Face Presence + Spatial Consistency per session)
            const faces = inputs.faceLandmarksArray || [];
            if (faces.length > 0) {
                let newImpressionsThisFrame = 0;

                faces.forEach((landmarks) => {
                    const nose = landmarks[1];
                    if (!nose) return;

                    let isAlreadyCounted = false;
                    for (const counted of countedFacesInSessionRef.current) {
                        const distance = Math.sqrt(
                            Math.pow(counted.x - nose.x, 2) + Math.pow(counted.y - nose.y, 2)
                        );
                        if (distance <= SPATIAL_TOLERANCE) {
                            isAlreadyCounted = true;
                            // Gently ease coordinates to account for slight shifting
                            counted.x = (counted.x * 0.8) + (nose.x * 0.2);
                            counted.y = (counted.y * 0.8) + (nose.y * 0.2);
                            break;
                        }
                    }

                    if (!isAlreadyCounted) {
                        // Found a "new" face during this Ad Session! Log an impression!
                        countedFacesInSessionRef.current.push({ x: nose.x, y: nose.y });
                        newImpressionsThisFrame++;
                    }
                });

                if (newImpressionsThisFrame > 0) {
                    setTotalImpressions(prev => prev + newImpressionsThisFrame);
                }
            }

            // 3. Telemetry Logic (Dwell & Attention happen regardless of impressions)
            const isPresent = faces.length > 0;
            const isLooking = inputs.isGazeValidated;

            if (!isPresent) {
                st.status = "IDLE";
                st.dwellStart = 0;
                st.attentionStart = 0;
                st.accumulatedAttention = 0;
            } else {
                if (st.dwellStart === 0) st.dwellStart = now;

                if (isLooking) {
                    if (st.status === "IDLE") {
                        st.status = "TRACKING";
                        st.attentionStart = now;
                    }
                } else {
                    if (st.status === "TRACKING") {
                        st.accumulatedAttention += (now - st.attentionStart);
                        st.status = "IDLE";
                        st.attentionStart = 0;
                    }
                }
            }

            // 4. Update UI Timers
            let displayDwell = 0;
            let displayAttention = st.accumulatedAttention;

            if (st.dwellStart > 0) {
                displayDwell = now - st.dwellStart;
            }
            if (st.status === "TRACKING") {
                displayAttention += (now - st.attentionStart);
            }

            if (now - lastUpdateRef.current > 100) { // ~10fps UI updates
                setStatus(st.status);
                setCurrentDwellTime(displayDwell);
                setCurrentAttentionTime(displayAttention);
                lastUpdateRef.current = now;
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []); 

    return {
        totalImpressions,
        currentDwellTime,
        currentAttentionTime,
        status,
    };
}
