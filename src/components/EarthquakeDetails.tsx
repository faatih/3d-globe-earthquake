import React from 'react';
import { formatDistance } from 'date-fns';
import { AlertTriangle, Activity, ArrowDown } from 'lucide-react';
import { Earthquake } from '../types/earthquake';

interface EarthquakeDetailsProps {
  earthquake: Earthquake | null;
}

const EarthquakeDetails: React.FC<EarthquakeDetailsProps> = ({ earthquake }) => {
  if (!earthquake) return null;

  const timeAgo = formatDistance(new Date(earthquake.properties.time), new Date(), { addSuffix: true });

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Activity className="text-red-500" />
        {earthquake.properties.title}
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`${getMagnitudeColor(earthquake.properties.mag)}`} />
          <span className="font-semibold">Magnitude:</span> {earthquake.properties.mag}
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowDown className="text-blue-500" />
          <span className="font-semibold">Depth:</span> {earthquake.geometry.coordinates[2]} km
        </div>
        
        <div>
          <span className="font-semibold">Location:</span><br />
          {earthquake.properties.place}
        </div>
        
        <div>
          <span className="font-semibold">Time:</span><br />
          {timeAgo}
        </div>
        
        {earthquake.properties.tsunami === 1 && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4">
            ⚠️ Tsunami Warning Issued
          </div>
        )}
        
        <a
          href={earthquake.properties.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline"
        >
          View More Details
        </a>
      </div>
    </div>
  );
};

const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 7) return 'text-red-500';
  if (magnitude >= 5) return 'text-orange-500';
  if (magnitude >= 3) return 'text-yellow-500';
  return 'text-green-500';
};

export default EarthquakeDetails;