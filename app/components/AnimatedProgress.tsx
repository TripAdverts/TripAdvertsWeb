"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Rocket } from "lucide-react"

export default function AnimatedProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let start: number | null = null;
    const duration = 1500; // 1.5 seconds

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const process = timestamp - start;
        const newProgress = Math.min(Math.floor((process / duration) * 100), 100);
        
        setProgress(newProgress);
        
        if (process < duration) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <div className="w-full flex items-center justify-between text-sm font-semibold text-teal-600 mb-3">
        {progress < 100 ? (
          <span className="animate-pulse">Launching...</span>
        ) : (
          <span>Launched!</span>
        )}
        <span className="w-10 text-right">{progress}%</span>
      </div>
      <div className="w-full flex items-center gap-4">
        <div className="flex-1">
          <Progress 
            value={progress} 
            className="h-3 bg-black/10 [&>div]:bg-teal-500 [&>div]:transition-none" 
          />
        </div>
        <Rocket className={`w-6 h-6 transition-colors duration-500 ${progress === 100 ? "text-teal-600 fill-teal-600" : "text-teal-600 fill-teal-100"}`} />
      </div>
    </div>
  )
}
