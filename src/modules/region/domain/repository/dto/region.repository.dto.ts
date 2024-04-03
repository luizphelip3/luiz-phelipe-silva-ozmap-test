import { User } from "../../../../../config/database/models/models";

export type CreateRegionDTO = {
  name: string;
  user: User;
  coordinates: [number, number];
};

export type FindRegionDTO = {
  _id?: string;
  name?: string;
  user?: User;
  coordinates?: [number, number];
};
