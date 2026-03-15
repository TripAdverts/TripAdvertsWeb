import { useState, useEffect, useRef } from "react";

// Distance threshold for spatial tracking (15% of the screen dimension)
// MediaPipe landmarks are normalized between 0.0 and 1.0
const SPATIAL_TOLERANCE = 0.15; 

// How long before a spatial region is "forgotten" and considered a new person
// For a ride-share environment, we assume people don't magically swap seats during a ride.
// A very long timeout (e.g., 30 minutes) represents the max length of a ride.
const RIDE_FORGET_TIMEOUT_MS = 30 * 60 * 1000; 

export interface UniqueViewer {
  id: number;
  x: number;
  y: number;
  firstSeen: number;
  lastSeen: number;
}

export function useReachTracker(faceLandmarksArray: any[]) {
  const [uniqueReach, setUniqueReach] = useState(0);
  
  // Keep track of the spatial locations of people we've seen
  const knownViewersRef = useRef<UniqueViewer[]>([]);
  // Keep track of the running ID counter
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (!faceLandmarksArray || faceLandmarksArray.length === 0) return;

    const now = Date.now();
    let reachIncremented = false;

    // Process each face detected in the current frame
    faceLandmarksArray.forEach((landmarks) => {
      // Use the tip of the nose (landmark 1) as the center point proxy
      const nose = landmarks[1];
      if (!nose) return;

      const currentX = nose.x;
      const currentY = nose.y;

      let matchedViewer: UniqueViewer | null = null;

      // 1. Try to find a match in known spatial regions
      for (const viewer of knownViewersRef.current) {
        // Calculate Euclidean distance between previous known point and current point
        // Note: For extreme accuracy, aspect ratio should be considered, but Euclidean on normalized 
        // coordinates works well enough for general quadrant tracking.
        const distance = Math.sqrt(
          Math.pow(viewer.x - currentX, 2) + Math.pow(viewer.y - currentY, 2)
        );

        if (distance <= SPATIAL_TOLERANCE) {
          matchedViewer = viewer;
          break;
        }
      }

      if (matchedViewer) {
        // Update the location and timestamp of the existing viewer
        // We gently ease the coordinate to allow for slow shifting in the seat
        matchedViewer.x = (matchedViewer.x * 0.8) + (currentX * 0.2);
        matchedViewer.y = (matchedViewer.y * 0.8) + (currentY * 0.2);
        matchedViewer.lastSeen = now;
      } else {
        // No match found within the 15% tolerance. This is a new Unique Viewer!
        const newViewer: UniqueViewer = {
          id: nextIdRef.current++,
          x: currentX,
          y: currentY,
          firstSeen: now,
          lastSeen: now,
        };
        knownViewersRef.current.push(newViewer);
        reachIncremented = true;
      }
    });

    // 2. Clean up old viewers who haven't been seen in a very long time (e.g. they got out of the car)
    knownViewersRef.current = knownViewersRef.current.filter(
      (viewer) => now - viewer.lastSeen < RIDE_FORGET_TIMEOUT_MS
    );

    // 3. Update state if we added someone new
    if (reachIncremented) {
      setUniqueReach(knownViewersRef.current.length);
    }

  }, [faceLandmarksArray]);

  return {
    uniqueReach,
    activeViewers: knownViewersRef.current
  };
}
