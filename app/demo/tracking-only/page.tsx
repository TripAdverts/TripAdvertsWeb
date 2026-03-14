"use client";

import { useState } from "react";
import FaceTracker from "../../components/ai/FaceTracker";
import { useImpressionTracker } from "../../hooks/useImpressionTracker";
import { useReachTracker } from "../../hooks/useReachTracker";

export default function TrackingDemoPage() {
    const [facesDetected, setFacesDetected] = useState(0);
    const [isGazeValidated, setIsGazeValidated] = useState(false);
    const [faceLandmarks, setFaceLandmarks] = useState<any[]>([]);

    const metrics = useImpressionTracker(facesDetected, isGazeValidated);
    const reachCoords = useReachTracker(faceLandmarks);

    const formatTime = (ms: number) => {
        return (ms / 1000).toFixed(1) + "s";
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-20 sm:p-12 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl font-bold mb-2">TripAdverts Analytics Engine</h1>
                    <p className="text-zinc-400 max-w-2xl">
                        Observe the edge-based AI telemetry in action. All processing runs entirely locally on-device without sending any image data to remote servers, preserving viewer privacy.
                    </p>
                </div>

                {/* Demo Frame */}
                <div className="grid md:grid-cols-12 gap-8">

                    {/* Main Video Feed */}
                    <div className="md:col-span-8 flex flex-col items-center">
                        <div className="bg-zinc-900 rounded-2xl p-1 border border-zinc-800 w-full overflow-hidden shadow-2xl relative aspect-video flex justify-center items-center">
                            <FaceTracker
                                width={800}
                                height={600}
                                showOverlay={true}
                                onFaceDetected={(result) => {
                                    setFacesDetected(result.faceLandmarks?.length || 0);
                                    if (result.faceLandmarks) setFaceLandmarks(result.faceLandmarks);
                                }}
                                onGazeChange={(isValidated) => setIsGazeValidated(isValidated)}
                            />
                        </div>
                        <p className="mt-4 text-xs text-zinc-500 font-mono">
                            [SYSTEM] Inference Running @ 10fps Limit
                        </p>
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-3">Live Metrics</h3>

                            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                                <span className="text-zinc-300">Faces Detected</span>
                                <span className={`font-mono font-bold ${facesDetected > 0 ? "text-green-500" : "text-zinc-500"}`}>
                                    {facesDetected}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                                <span className="text-white font-bold">Gaze Status</span>
                                <span className={`font-mono font-bold px-2 py-0.5 rounded text-sm ${facesDetected === 0 ? "bg-zinc-800 text-zinc-500" :
                                    isGazeValidated ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                    }`}>
                                    {facesDetected === 0 ? "NO FACE" : (isGazeValidated ? "VALIDATED" : "LOST")}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-3">Live Impression State</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-zinc-400 text-sm">State</span>
                                        <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${metrics.status === 'IDLE' ? 'bg-zinc-800 text-zinc-500' :
                                            metrics.status === 'VALIDATING' ? 'bg-yellow-500/20 text-yellow-400' :
                                                metrics.status === 'DROP_OFF_GRACE_PERIOD' ? 'bg-orange-500/20 text-orange-400' :
                                                    'bg-green-500/20 text-green-400'
                                            }`}>
                                            {metrics.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-zinc-400 text-sm">Active Session</span>
                                        <span className={`font-mono text-sm ${metrics.activeSession ? 'text-green-400' : 'text-zinc-500'}`}>{metrics.activeSession ? "YES" : "NO"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-zinc-400 text-sm">Dwell Time</span>
                                        <span className="font-mono text-sm text-zinc-300">{formatTime(metrics.currentDwellTime)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-zinc-400 text-sm">Attention Time</span>
                                        <span className="font-mono text-sm text-zinc-300">{formatTime(metrics.currentAttentionTime)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Impressions Highlight */}
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-5 mt-2 flex flex-col items-center justify-center">
                            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Verified Impressions</span>
                            <span className="text-5xl font-black text-white font-mono">{metrics.totalImpressions}</span>
                        </div>

                        {/* Unique Reach Highlight */}
                        <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-xl p-5 mt-2 flex flex-col items-center justify-center">
                            <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider mb-1">Unique Viewers (Reach)</span>
                            <span className="text-5xl font-black text-white font-mono">{reachCoords.uniqueReach}</span>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                                <span className="text-zinc-300">Model Load</span>
                                <span className="font-mono text-zinc-300">MobileNet V3 + MediaPipe</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                                <span className="text-zinc-300">Latency</span>
                                <span className="font-mono text-zinc-300">~12ms</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-zinc-300">Privacy Mode</span>
                                <span className="font-mono text-green-500">EDGE_ONLY</span>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 mt-auto">
                            <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Instructions</h4>
                            <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                                <li>Look directly at the camera to trigger <span className="text-green-400">GAZE VALIDATED</span>.</li>
                                <li>Turn your head left/right (Yaw {'>'} 20°) to trigger <span className="text-red-400">GAZE LOST</span>.</li>
                                <li>Look up/down (Pitch {'>'} 15°) to trigger <span className="text-red-400">GAZE LOST</span>.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
