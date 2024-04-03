
export type CreateRegionDTO = {
  name: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  userId: string;
};