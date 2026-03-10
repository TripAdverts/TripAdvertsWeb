"use client"

import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const staticCircles = [
  { center: [5.60, -0.17] as [number, number], radius: 1500, color: '#44B8A7' },
  { center: [5.63, -0.15] as [number, number], radius: 1200, color: '#ffb703' },
  { center: [5.56, -0.19] as [number, number], radius: 2000, color: '#fb8500' },
];

export default function AccraMapInner() {
  return (
    <div className="relative w-full h-full font-sans">
      <MapContainer
        center={[5.58, -0.19]}
        zoom={12}
        style={{ width: '100%', height: '100%', background: '#F6F6F6', zIndex: 0 }}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {staticCircles.map((circle, i) => (
          <Circle 
            key={i}
            center={circle.center} 
            radius={circle.radius}
            pathOptions={{
              color: circle.color,
              fillColor: circle.color,
              fillOpacity: 0.25,
              weight: 2,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
