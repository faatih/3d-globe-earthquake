import React, { useEffect, useRef } from 'react';
import GlobeGL from 'react-globe.gl';
import { useEarthquakeData } from '../context/EarthquakeContext';
import type { GlobeMethods } from 'react-globe.gl';

function Globe() {
  const globeRef = useRef<GlobeMethods>();
  const { earthquakes } = useEarthquakeData();

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.1;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.minDistance = 200;
      controls.maxDistance = 400;
    }
  }, []);

  const barData = earthquakes.map(eq => ({
    lat: eq.geometry.coordinates[1],
    lng: eq.geometry.coordinates[0],
    height: eq.properties.mag * 0.5, // Scale height based on magnitude
    magnitude: eq.properties.mag,
    color: getMagnitudeColor(eq.properties.mag),
    place: eq.properties.place
  }));

  return (
    <div className="w-full h-full">
      <GlobeGL
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        hexBinPointsData={barData}
        hexBinPointWeight="magnitude"
        hexAltitude={d => d.sumWeight * 0.08}
        hexBinResolution={4}
        hexTopColor={d => getMagnitudeColor(d.sumWeight / d.count)}
        hexSideColor={d => getMagnitudeColor(d.sumWeight / d.count)}
        hexBinMerge={true}
        hexTransitionDuration={1000}
        width={800}
        height={600}
        atmosphereColor="#a7b5d4"
        atmosphereAltitude={0.25}
        hexLabel={d => `
          <div class="text-xs bg-gray-900/90 backdrop-blur-sm text-white rounded px-2 py-1">
            <div class="font-bold">Magnitude: ${(d.sumWeight / d.count).toFixed(1)}</div>
            <div>Events: ${d.points.length}</div>
          </div>
        `}
      />
    </div>
  );
}

function getMagnitudeColor(magnitude: number): string {
  if (magnitude >= 7) return '#ef4444';
  if (magnitude >= 5) return '#f97316';
  if (magnitude >= 3) return '#eab308';
  return '#22c55e';
}

export default Globe;