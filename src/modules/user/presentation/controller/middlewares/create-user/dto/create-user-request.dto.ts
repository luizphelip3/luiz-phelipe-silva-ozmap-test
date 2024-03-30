import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Coordinates, Address } from '../../../../../../shared/utils';
import { Type } from 'class-transformer';
import { AddressDTO } from './address.dto';
import { CoordinatesDTO } from './coordinates.dto';

export class CreateUserRequestDTO {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'Email should be a string' })
  email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDTO)
  address?: AddressDTO;

  @IsOptional()
  @ValidateNested({
    message: 'coordinates property must be an object with lat and lng data',
  })
  @Type(() => CoordinatesDTO)
  coordinates?: CoordinatesDTO;

  constructor(props: {
    name: string;
    email: string;
    addres?: Address;
    coordinates?: Coordinates;
  }) {
    Object.assign(this, props);
  }
}
