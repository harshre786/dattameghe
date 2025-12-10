export interface ISSPosition {
  latitude: string;
  longitude: string;
}

export const getISSPosition = async (): Promise<ISSPosition> => {
  const response = await fetch('http://api.open-notify.org/iss-now.json', { next: { revalidate: 600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch ISS position');
  }
  const data = await response.json();
  return data.iss_position;
};
