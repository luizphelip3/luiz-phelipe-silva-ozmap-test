import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from '../../../../../../../shared/utils/dtos/address/address.dto';
import { CoordinatesDTO } from '../../../../../../../shared/utils/dtos/coordinates/coordinates.dto';

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
}
