import { Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Address, Coordinates } from '../../../../../../../shared/utils';
import { AddressDTO } from '../address/address.dto';
import { CoordinatesDTO } from '../coordinates/coordinates.dto';

export class UpdateUserRequestDTO {
  @IsOptional()
  @IsString({ message: 'name should be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'email should be a string' })
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDTO)
  address?: AddressDTO;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CoordinatesDTO)
  coordinates?: CoordinatesDTO;

  constructor(props: {
    name?: string;
    email?: string;
    address?: Address;
    coordinates?: Coordinates;
  }) {
    Object.assign(this, props);
  }
}
