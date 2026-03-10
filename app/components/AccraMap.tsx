"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const MapInner = dynamic(() => import('./AccraMapInner'), { ssr: false });

export default function AccraMap() {
  return (
    <div className="w-full h-full rounded-tl-2xl overflow-hidden relative border-t border-l border-black/5 bg-[#f6f6f6] shadow-lg">
      <MapInner />
      {/* Light Gradient Overlay to blend it gently */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-[1000]" />
    </div>
  );
}
