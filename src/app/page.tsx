"use client";

import { useEffect, useState } from 'react';
import { getISSPosition, ISSPosition } from '@/lib/api/iss';
import { getSolarFlares, SolarFlare } from '@/lib/api/weather';
import NotificationBanner from '@/components/NotificationBanner';

export default function Home() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [majorEvent, setMajorEvent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getISSPosition();
        setIssPosition(position);

        // Simulate checking for a major event
        const solarFlares = await getSolarFlares();
        if (solarFlares.some(flare => flare.classType.startsWith('X'))) {
          setMajorEvent(true);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {majorEvent && <NotificationBanner message="Major Solar Flare Detected!" />}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold">Welcome to AstroVision</h1>
        <p className="text-xl mt-4 text-gray-300">Your one-stop destination for all things space.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold">Next Launch</h3>
          <p className="mt-2">Falcon 9</p>
          <p className="text-sm text-gray-400">Cape Canaveral</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold">Solar Activity</h3>
          <p className="mt-2">Kp-Index: 3</p>
          <p className="text-sm text-gray-400">Low</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold">ISS Position</h3>
          {loading ? (
            <p className="mt-2">Loading...</p>
          ) : (
            <>
              <p className="mt-2">Lat: {issPosition?.latitude}</p>
              <p className="text-sm text-gray-400">Lon: {issPosition?.longitude}</p>
            </>
          )}
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg">
          <h3 className="text-2xl font-bold">Today's Event</h3>
          <p className="mt-2">Perseid Meteor Shower</p>
          <p className="text-sm text-gray-400">Peak viewing tonight</p>
        </div>
      </div>
    </div>
  );
}
