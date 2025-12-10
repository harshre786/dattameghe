// Load NASA API Key from .env
const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

if (!API_KEY) {
  throw new Error("NASA API Key missing! Add NEXT_PUBLIC_NASA_API_KEY in .env.local");
}

export interface Asteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: any[];
  estimated_diameter: any;
}

// Main function
export const getAsteroidsForRange = async (
  start: string,
  end: string
): Promise<Asteroid[]> => {
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`;

  const response = await fetch(apiUrl, {
    next: { revalidate: 600 }, // Cache for 10 min (Next.js)
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error("❌ Failed to fetch asteroid data from NASA API");
  }

  const data = await response.json();

  // Flattening the data (very fast)
  const asteroids: Asteroid[] = [];

  for (const day of Object.keys(data.near_earth_objects)) {
    asteroids.push(...data.near_earth_objects[day]);
  }

  return asteroids;
};
