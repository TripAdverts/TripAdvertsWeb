import { useState, useEffect, useRef } from "react";

export interface ImpressionMetrics {
    totalImpressions: number;
    activeSession: boolean;
    currentDwellTime: number;
    currentAttentionTime: number;
    status: "IDLE" | "VALIDATING" | "TRACKING" | "DROP_OFF_GRACE_PERIOD";
}

const THRESHOLD_MS = 500;
const DROP_OFF_TOLERANCE_MS = 1500;
const COOLDOWN_PERIOD_MS = 10000; // 10 seconds

export function useImpressionTracker(
    facesDetected: number,
    isGazeValidated: boolean
): ImpressionMetrics {
    const [totalImpressions, setTotalImpressions] = useState(0);
    const [activeSession, setActiveSession] = useState(false);
    const [currentDwellTime, setCurrentDwellTime] = useState(0);
    const [currentAttentionTime, setCurrentAttentionTime] = useState(0);
    const [status, setStatus] = useState<ImpressionMetrics["status"]>("IDLE");

    // Timers and Refs for exact millisecond tracking
    const stateRef = useRef({
        status: "IDLE" as ImpressionMetrics["status"],
        dwellStart: 0,
        attentionStart: 0,
        dropOffStart: 0,
        accumulatedAttention: 0,
        hasActiveSession: false,
        lastImpressionTime: 0,
    });

    const inputsRef = useRef({ facesDetected, isGazeValidated });
    useEffect(() => {
        inputsRef.current = { facesDetected, isGazeValidated };
    }, [facesDetected, isGazeValidated]);

    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            const now = Date.now();
            const st = stateRef.current;
            const inputs = inputsRef.current;

            // 1. Determine base state from props
            const isPresent = inputs.facesDetected > 0;
            const isLooking = inputs.isGazeValidated;

            // 2. Handle State Machine Transitions
            if (!isPresent) {
                // Complete reset if face is lost
                st.status = "IDLE";
                st.dwellStart = 0;
                st.attentionStart = 0;
                st.dropOffStart = 0;
                st.accumulatedAttention = 0;
                st.hasActiveSession = false;
                st.lastImpressionTime = 0;
            } else {
                // Face is present, meaning Dwell Time is accumulating
                if (st.dwellStart === 0) st.dwellStart = now;

                if (st.status === "IDLE") {
                    if (isLooking) {
                        st.status = "VALIDATING";
                        st.attentionStart = now;
                    }
                }
                else if (st.status === "VALIDATING") {
                    if (isLooking) {
                        const continuousLook = now - st.attentionStart;
                        if (continuousLook >= THRESHOLD_MS) {
                            st.status = "TRACKING";
                            st.hasActiveSession = true;

                            // Upfront Logging & Time-Based Cooldown Rule: 
                            // Because viewers are seated for long durations (ride-share), 
                            // we log an impression instantly, but enforce a 10-second cooldown 
                            // before the *same person* can trigger another one.
                            if (now - st.lastImpressionTime > COOLDOWN_PERIOD_MS) {
                                setTotalImpressions(prev => prev + 1);
                                st.lastImpressionTime = now;
                            }
                        }
                    } else {
                        // Failed validation threshold, reset
                        st.status = "IDLE";
                        st.attentionStart = 0;
                    }
                }
                else if (st.status === "TRACKING") {
                    if (!isLooking) {
                        st.status = "DROP_OFF_GRACE_PERIOD";
                        st.dropOffStart = now;
                        // lock in the attention time so far
                        st.accumulatedAttention += (now - st.attentionStart);
                        st.attentionStart = 0;
                    }
                }
                else if (st.status === "DROP_OFF_GRACE_PERIOD") {
                    if (isLooking) {
                        // Recovered within grace period
                        st.status = "TRACKING";
                        st.attentionStart = now;
                        st.dropOffStart = 0;
                    } else {
                        const dropOffDuration = now - st.dropOffStart;
                        if (dropOffDuration > DROP_OFF_TOLERANCE_MS) {
                            // Session failed to recover. We do NOT log the impression here anymore, 
                            // because it was already logged upfront. We just tear down the session tracking 
                            // while keeping them in the same Dwell context.
                            st.status = "IDLE";
                            st.hasActiveSession = false;
                            st.dwellStart = now; // Restart dwell for the still-present face
                            st.accumulatedAttention = 0;
                        }
                    }
                }
            }

            // 3. Update active timers for UI rendering
            let displayDwell = 0;
            let displayAttention = st.accumulatedAttention;

            if (st.dwellStart > 0) {
                displayDwell = now - st.dwellStart;
            }

            if (st.status === "VALIDATING" || st.status === "TRACKING") {
                displayAttention += (now - st.attentionStart);
            }

            // Throttle UI updates slightly to prevent excessive React renders
            if (now - lastUpdateRef.current > 50) { // ~20fps UI updates
                setActiveSession(st.hasActiveSession);
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
    }, []); // Run loop once on mount, reading from refs

    return {
        totalImpressions,
        activeSession,
        currentDwellTime,
        currentAttentionTime,
        status,
    };
}
