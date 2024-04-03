
export type CreateRegionDTO = {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  userId: string;
};