"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LayoutType = "HERO_LAYOUT" | "GRID_MATRIX" | "SPLIT_SOCIAL";

const labels: Record<LayoutType, string> = {
  HERO_LAYOUT: "Hero",
  GRID_MATRIX: "Grid",
  SPLIT_SOCIAL: "Split",
};

function Block({
  label,
  className,
  color,
  initial,
  animate,
  exit,
}: {
  label: string;
  className?: string;
  color: string;
  initial?: any;
  animate?: any;
  exit?: any;
}) {
  return (
    <motion.div
      layout
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-white/20 ${className}`}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 20px ${color.replace('0.8)', '0.4)')}` // Adds a soft neon glow
      }}
    >
      <span className="text-white drop-shadow-md mb-[5px]">{label}</span>
    </motion.div>
  );
}

// We use a single layout wrapper, and the blocks just re-arrange their flex/grid sizing.
function DynamicLayout({ active }: { active: LayoutType }) {
  return (
    <div className="w-full h-full flex flex-col gap-[2%] p-[2%] relative">
      {/* Block 1 (Hero/Header/Left) */}
      <Block
        label={
          active === "HERO_LAYOUT" ? "Hero Spot" :
          active === "GRID_MATRIX" ? "Header" : "Left Column"
        }
        className={
          active === "HERO_LAYOUT" ? "absolute top-[2%] left-[2%] w-[70%] h-[69%]" :
          active === "GRID_MATRIX" ? "absolute top-[2%] left-[2%] w-[96%] h-[19%]" : 
                                     "absolute top-[2%] left-[2%] w-[31%] h-[96%]"
        }
        color={
          active === "HERO_LAYOUT" ? "rgba(0, 255, 255, 0.8)" :
          active === "GRID_MATRIX" ? "rgba(255, 255, 0, 0.8)" : 
                                     "rgba(0, 255, 255, 0.8)"
        }
      />

      {/* Block 2 (Sidebar/Block A/Top Right) */}
      <Block
        label={
          active === "HERO_LAYOUT" ? "Sidebar" :
          active === "GRID_MATRIX" ? "Block A" : "Top Right"
        }
        className={
          active === "HERO_LAYOUT" ? "absolute top-[2%] right-[2%] w-[26%] h-[69%]" :
          active === "GRID_MATRIX" ? "absolute top-[23%] left-[2%] w-[47%] h-[36%]" : 
                                     "absolute top-[2%] right-[2%] w-[65%] h-[47%]"
        }
        color={
          active === "HERO_LAYOUT" ? "rgba(157, 0, 255, 0.8)" :
          active === "GRID_MATRIX" ? "rgba(0, 255, 255, 0.8)" : 
                                     "rgba(157, 0, 255, 0.8)"
        }
      />

      {/* Block 3 (Bottom Banner/Block B/Tile Ads) */}
      <Block
        label={
          active === "HERO_LAYOUT" ? "Bottom Banner" :
          active === "GRID_MATRIX" ? "Block B" : "Tile Ads"
        }
        className={
          active === "HERO_LAYOUT" ? "absolute bottom-[2%] left-[2%] w-[96%] h-[25%]" :
          active === "GRID_MATRIX" ? "absolute top-[23%] right-[2%] w-[47%] h-[36%]" : 
                                     "absolute bottom-[2%] right-[2%] w-[65%] h-[47%]"
        }
        color={
          active === "HERO_LAYOUT" ? "rgba(255, 0, 128, 0.8)" :
          active === "GRID_MATRIX" ? "rgba(157, 0, 255, 0.8)" : 
                                     "rgba(255, 0, 128, 0.8)"
        }
      />

      {/* Block 4 (Hidden/Block C/Hidden) */}
      <AnimatePresence>
        {active === "GRID_MATRIX" && (
          <Block
            label="Block C"
            className="absolute bottom-[2%] left-[2%] w-[47%] h-[37%]"
            color="rgba(255, 0, 128, 0.8)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Block 5 (Hidden/Block D/Hidden) */}
      <AnimatePresence>
        {active === "GRID_MATRIX" && (
          <Block
            label="Block D"
            className="absolute bottom-[2%] right-[2%] w-[47%] h-[37%]"
            color="rgba(0, 255, 0, 0.8)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdLayoutSwitcher() {
  const [active, setActive] = useState<LayoutType>("HERO_LAYOUT");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActive((current) => {
        const keys = Object.keys(labels) as LayoutType[];
        const currentIndex = keys.indexOf(current);
        return keys[(currentIndex + 1) % keys.length];
      });
    }, 2500); // 2.5 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="w-full h-[85%] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-6 sm:gap-8 mt-auto mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layout preview */}
      <div className="w-[90%] sm:w-[85%] md:w-[75%] max-w-2xl aspect-[16/10] sm:aspect-video bg-[#1a1a1c] rounded-xl sm:rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative flex shrink-0">
        {/* Dynamic Layout Animates its internal components */}
        <DynamicLayout active={active} />
      </div>


    </div>
  );
}
