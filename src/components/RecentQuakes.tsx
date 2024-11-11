import React from 'react';
import { format } from 'date-fns';

interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
  };
}

interface RecentQuakesProps {
  earthquakes: Earthquake[];
}

export default function RecentQuakes({ earthquakes }: RecentQuakesProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recent Earthquakes</h2>
      <div className="overflow-auto max-h-[400px]">
        {earthquakes.map(quake => (
          <div
            key={quake.id}
            className="border-b border-gray-100 last:border-0 py-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{quake.properties.place}</p>
                <p className="text-sm text-gray-500">
                  {format(quake.properties.time, 'PPp')}
                </p>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${quake.properties.mag >= 4.5 ? 'bg-red-100 text-red-800' :
                  quake.properties.mag >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}
              `}>
                M {quake.properties.mag.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}