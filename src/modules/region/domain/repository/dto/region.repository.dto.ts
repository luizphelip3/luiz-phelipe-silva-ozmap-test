import { User } from '../../../../../config/database/models/models';

export type CreateRegionDTO = {
  name: string;
  user: User;
  coordinates: [number, number];
};

export type FindRegionDTO = {
  _id?: string;
  name?: string;
  coordinates?: [number, number];
  user: User;
};

export type FindAllRegionsDTO = {
  page: number;
  limit: number;
  user: User;
};

export type FindAllRegionsByCoordinateDTO = {
  lat: number;
  lng: number;
  user: User;
};
