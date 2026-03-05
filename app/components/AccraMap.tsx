"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const MapInner = dynamic(() => import('./AccraMapInner'), { ssr: false });

export default function AccraMap() {
  return (
    <div className="w-full h-full rounded-tl-[2rem] overflow-hidden relative">
      <MapInner />
      {/* Premium Gradient Overlay to blend it into the bento box */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-transparent to-transparent pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1d1d1f] via-transparent to-transparent pointer-events-none opacity-40" />
    </div>
  );
}
