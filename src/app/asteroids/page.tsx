"use client";

import { useEffect, useState } from 'react';
import { getAsteroidsForRange, Asteroid } from '@/lib/api/asteroids';

const AsteroidsPage = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const asteroidData = await getAsteroidsForRange("2025-02-01", "2025-02-07");

        setAsteroids(asteroidData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchAsteroids();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Asteroids & NEO Tracking</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
          <thead>
            <tr className="border-b border-gray-500">
              <th className="text-left p-4">Object Name</th>
              <th className="text-left p-4">Approach Date</th>
              <th className="text-left p-4">Miss Distance (km)</th>
              <th className="text-left p-4">Hazard Rating</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">Loading...</td>
              </tr>
            ) : (
              asteroids.map((asteroid) => (
                <tr key={asteroid.id} className="border-b border-gray-700">
                  <td className="p-4">{asteroid.name}</td>
                  <td className="p-4">{asteroid.close_approach_data[0].close_approach_date}</td>
                  <td className="p-4">{parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()}</td>
                  <td className="p-4">{asteroid.is_potentially_hazardous_asteroid ? 'High' : 'Low'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsteroidsPage;
