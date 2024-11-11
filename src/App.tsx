import React from 'react';
import Dashboard from './components/Dashboard';
import { EarthquakeProvider } from './context/EarthquakeContext';

function App() {
  return (
    <EarthquakeProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Dashboard />
        
      </div>
    </EarthquakeProvider>
  );
}

export default App;