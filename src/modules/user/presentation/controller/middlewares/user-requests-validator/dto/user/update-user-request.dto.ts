import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
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
}
