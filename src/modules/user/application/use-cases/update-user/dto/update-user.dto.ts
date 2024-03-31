import { Address, Coordinates } from "../../../../../shared/utils";

export type UpdateUserDTO = {
  name?: string;
  email?: string;
  address?: Address;
  coordinates?: Coordinates;
};