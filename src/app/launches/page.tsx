"use client";

import { useEffect, useState } from 'react';
import { getUpcomingLaunches, Launch } from '@/lib/api/launches';
import { getSpaceXLaunches } from '@/lib/api/spacex';

const LaunchesPage = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const upcomingLaunches = await getUpcomingLaunches();
        setLaunches(upcomingLaunches);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    const fetchSpaceXLaunches = async () => {
      try {
        const spacexLaunches = await getSpaceXLaunches();
        console.log(spacexLaunches);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLaunches();
    fetchSpaceXLaunches();
  }, []);

  const filteredLaunches = launches.filter((launch) =>
    launch.mission.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Rocket Launches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLaunches.map((launch) => (
          <div key={launch.id} className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold">{launch.mission.name}</h2>
            <p className="mt-2">{launch.rocket.configuration.full_name}</p>
            <p className="text-sm text-gray-400">{new Date(launch.window_start).toLocaleString()}</p>
            <button onClick={() => console.log(`Bookmarked: ${launch.mission.name}`)} className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600 self-start">
              Bookmark
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchesPage;
