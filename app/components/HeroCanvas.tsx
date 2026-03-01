"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function HeroCanvas({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Create an array of image paths for the 10 frames
  const framePaths = Array.from({ length: 10 }, (_, i) =>
    `/frames/Video1_${String(i + 1).padStart(3, '0')}.jpg`
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform scroll progress to an index between 0 and 9
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 9]);

  // Preload images to ensure smooth scrubbing
  const images = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    framePaths.forEach((path, i) => {
      const img = new Image();
      img.src = path;
      images.current[i] = img;
    });
  }, []); // Run once on mount

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We'll draw the first frame initially once it's loaded
    const initialImg = new Image();
    initialImg.src = framePaths[0];
    initialImg.onload = () => {
      const updateCanvasSize = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      };
      updateCanvasSize();
      
      const drawImageCover = (img: HTMLImageElement) => {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawnWidth = canvas.width;
        let drawnHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
           drawnWidth = canvas.width;
           drawnHeight = canvas.width / imgRatio;
           offsetX = 0;
           offsetY = (canvas.height - drawnHeight) / 2;
        } else {
           drawnHeight = canvas.height;
           drawnWidth = canvas.height * imgRatio;
           offsetX = (canvas.width - drawnWidth) / 2;
           offsetY = 0;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawnWidth, drawnHeight);
      };

      drawImageCover(initialImg);

      // Listen for scroll changes
      const unsubscribe = frameIndex.on("change", (latestVal) => {
        const index = Math.min(9, Math.max(0, Math.floor(latestVal)));
        const img = images.current[index];
        if (img && img.complete) {
          drawImageCover(img);
        }
      });

      // Handle resize
      const handleResize = () => {
        updateCanvasSize();
        const index = Math.min(9, Math.max(0, Math.floor(frameIndex.get())));
        const img = images.current[index];
        if (img && img.complete) {
          drawImageCover(img);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        unsubscribe();
        window.removeEventListener("resize", handleResize);
      };
    };
  }, [frameIndex]);

  return (
    <section ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-950 flex flex-col md:flex-row">
        <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
          <div className="w-full md:w-1/2 pointer-events-auto">
            {children}
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 h-full bg-slate-950" />
        <div className="relative w-full h-full md:w-1/2 flex-shrink-0 z-0">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 md:opacity-80 mix-blend-screen" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent hidden md:block" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
