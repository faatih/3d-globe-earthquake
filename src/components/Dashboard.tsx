import React from 'react';
import Globe from './Globe';
import EarthquakeList from './EarthquakeList';
import Stats from './Stats';
import { useEarthquakeData } from '../context/EarthquakeContext';
import { Loader2 } from 'lucide-react';

function Dashboard() {
  const { loading, error } = useEarthquakeData();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading earthquake data: {error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-400">Global Earthquake Monitor</h1>
        <p className="text-gray-400 mt-2">Real-time earthquake data visualization</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-4 h-[600px]">
            <Globe />
          </div>
        </div>
        <div className="space-y-8">
          <Stats />
          <EarthquakeList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;