export interface KpIndex {
  time_tag: string;
  kp_index: number;
}

export const getPlanetaryKIndex = async (): Promise<KpIndex[]> => {
  const response = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json', { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch planetary K-index');
  }
  const data = await response.json();
  return data;
};

export interface SolarFlare {
  flrID: string;
  beginTime: string;
  peakTime: string;
  classType: string;
}

export const getSolarFlares = async (): Promise<SolarFlare[]> => {
  const response = await fetch('https://api.nasa.gov/DONKI/FLR?api_key=DEMO_KEY', { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch solar flares');
  }
  const data = await response.json();
  return data;
};
