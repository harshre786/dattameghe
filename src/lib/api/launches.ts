export interface Launch {
  id: string;
  name: string;
  window_start: string;
  window_end: string;
  mission: {
    name: string;
    description: string;
  };
  rocket: {
    configuration: {
      full_name: string;
    };
  };
  pad: {
    name: string;
    location: {
      name: string;
    };
  };
}

export const getUpcomingLaunches = async (): Promise<Launch[]> => {
  const response = await fetch('https://ll.thespacedevs.com/2.3.0/launch/upcoming/?limit=10&mode=detailed', { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming launches');
  }
  const data = await response.json();
  return data.results;
};
