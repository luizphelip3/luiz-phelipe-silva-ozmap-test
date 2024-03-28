import { Address, Coordinates } from "../../../../../shared/utils";

export type CreateUserDTO = {
  name: string;
  email: string;
  address?: Address;
  coordinates?: Coordinates;
};