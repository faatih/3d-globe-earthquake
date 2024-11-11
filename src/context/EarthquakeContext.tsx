import React, { createContext, useContext, useEffect, useState } from 'react';

interface Earthquake {
  id: string;
  properties: {
    mag: number;
    place: string;
    time: number;
  };
  geometry: {
    coordinates: number[];
  };
}

interface EarthquakeContextType {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
}

const EarthquakeContext = createContext<EarthquakeContextType>({
  earthquakes: [],
  loading: true,
  error: null,
});

export function EarthquakeProvider({ children }: { children: React.ReactNode }) {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await fetch(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        if (!response.ok) throw new Error('Failed to fetch earthquake data');
        const data = await response.json();
        setEarthquakes(data.features);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <EarthquakeContext.Provider value={{ earthquakes, loading, error }}>
      {children}
    </EarthquakeContext.Provider>
  );
}

export function useEarthquakeData() {
  const context = useContext(EarthquakeContext);
  if (context === undefined) {
    throw new Error('useEarthquakeData must be used within an EarthquakeProvider');
  }
  return context;
}