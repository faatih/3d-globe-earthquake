import React from 'react';
import { useEarthquakeData } from '../context/EarthquakeContext';
import { formatDistanceToNow } from 'date-fns';

function EarthquakeList() {
  const { earthquakes } = useEarthquakeData();

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Earthquakes</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {earthquakes.slice(0, 10).map((eq) => (
          <div
            key={eq.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${getMagnitudeClass(eq.properties.mag)}`}>
                M {eq.properties.mag.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(eq.properties.time), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm mt-2">{eq.properties.place}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getMagnitudeClass(magnitude: number): string {
  if (magnitude >= 7) return 'text-red-500';
  if (magnitude >= 5) return 'text-orange-500';
  if (magnitude >= 3) return 'text-yellow-500';
  return 'text-green-500';
}

export default EarthquakeList;