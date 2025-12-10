export interface SpaceXLaunch {
  id: string;
  name: string;
  details: string;
  links: {
    webcast: string;
    article: string;
    wikipedia: string;
  };
}

export const getSpaceXLaunches = async (): Promise<SpaceXLaunch[]> => {
  const response = await fetch('https://api.spacexdata.com/v4/launches', { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch SpaceX launches');
  }
  const data = await response.json();
  return data;
};
