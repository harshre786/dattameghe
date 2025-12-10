"use client";

import { useEffect, useState } from 'react';
import { getPlanetaryKIndex, KpIndex, getSolarFlares, SolarFlare } from '@/lib/api/weather';

const SpaceWeatherPage = () => {
  const [kpIndex, setKpIndex] = useState<KpIndex | null>(null);
  const [solarFlares, setSolarFlares] = useState<SolarFlare[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpIndexData, solarFlareData] = await Promise.all([
          getPlanetaryKIndex(),
          getSolarFlares(),
        ]);
        setKpIndex(kpIndexData[kpIndexData.length - 1]);
        setSolarFlares(solarFlareData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Space Weather</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Solar Flares</h2>
          {loading ? (
            <p className="mt-2">Loading...</p>
          ) : (
            <p className="mt-2">Latest Flare: {solarFlares[solarFlares.length - 1]?.classType}</p>
          )}
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Geomagnetic Storm</h2>
          {loading ? (
            <p className="mt-2">Loading...</p>
          ) : (
            <p className="mt-2">Kp-Index: {kpIndex?.kp_index}</p>
          )}
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Aurora Forecast</h2>
          <p className="mt-2">Low activity.</p>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeatherPage;
