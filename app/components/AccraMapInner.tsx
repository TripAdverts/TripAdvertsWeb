"use client"

import React from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const geofences = [
  {
    // Accra Central / CBD — bounded by Ring Road Central, Independence Ave, High Street, Kwame Nkrumah Ave
    color: '#00ff87',
    positions: [
      [5.5744, -0.2003],
      [5.5741, -0.1958],
      [5.5732, -0.1922],
      [5.5705, -0.1874],
      [5.5685, -0.1922],
      [5.5641, -0.1946],
      [5.5597, -0.1969],
      [5.5552, -0.2004],
      [5.5516, -0.2028],
      [5.5480, -0.1977],
      [5.5457, -0.2029],
      [5.5414, -0.2065],
      [5.5449, -0.2097],
      [5.5709, -0.2108],
      [5.5720, -0.2053],
      [5.5744, -0.2003],
    ] as [number, number][],
  },
  {
    // Osu — bounded by Ring Road East, Independence Ave, coastline
    color: '#ff00ff',
    positions: [
      [5.5695, -0.1855],
      [5.5667, -0.1807],
      [5.5639, -0.1753],
      [5.5612, -0.1707],
      [5.5582, -0.1678],
      [5.5567, -0.1668],
      [5.5548, -0.1601],
      [5.5516, -0.1674],
      [5.5500, -0.1730],
      [5.5475, -0.1810],
      [5.5445, -0.1899],
      [5.5424, -0.2000],
      [5.5516, -0.2028],
      [5.5552, -0.2004],
      [5.5597, -0.1969],
      [5.5641, -0.1946],
      [5.5685, -0.1922],
      [5.5695, -0.1855],
    ] as [number, number][],
  },
  {
    // East Legon — bounded by Boundary Road, Spintex Road area
    color: '#00e5ff',
    positions: [
      [5.6283, -0.1712],
      [5.6289, -0.1656],
      [5.6299, -0.1615],
      [5.6306, -0.1566],
      [5.6449, -0.1486],
      [5.6507, -0.1505],
      [5.6567, -0.1512],
      [5.6598, -0.1515],
      [5.6436, -0.1118],
      [5.6405, -0.1195],
      [5.6366, -0.1293],
      [5.6322, -0.1399],
      [5.6275, -0.1508],
      [5.6258, -0.1585],
      [5.6232, -0.1682],
      [5.6283, -0.1712],
    ] as [number, number][],
  },
];

export default function AccraMapInner() {
  return (
    <MapContainer
      center={[5.6037, -0.1870]}
      zoom={11}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {geofences.map((fence, i) => (
        <Polygon
          key={i}
          positions={fence.positions}
          pathOptions={{
            color: fence.color,
            weight: 2,
            fillColor: fence.color,
            fillOpacity: 0.12,
            opacity: 0.85,
          }}
        />
      ))}
    </MapContainer>
  );
}
