import React from 'react';
import { useEarthquakeData } from '../context/EarthquakeContext';

function Stats() {
  const { earthquakes } = useEarthquakeData();

  const stats = {
    total: earthquakes.length,
    significant: earthquakes.filter(eq => eq.properties.mag >= 6).length,
    average: earthquakes.reduce((acc, eq) => acc + eq.properties.mag, 0) / earthquakes.length
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total"
          value={stats.total}
          description="Last 24 hours"
        />
        <StatCard
          title="Significant"
          value={stats.significant}
          description="Magnitude 6+"
        />
        <StatCard
          title="Average"
          value={stats.average.toFixed(1)}
          description="Magnitude"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, description }: { title: string; value: number | string; description: string }) {
  return (
    <div className="bg-gray-700 rounded-lg p-3 text-center">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <div className="text-2xl font-bold text-blue-400 my-1">{value}</div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default Stats;