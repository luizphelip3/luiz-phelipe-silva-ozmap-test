import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CoordinatesDTO } from '../../../../../shared/utils/dtos/coordinates/coordinates.dto';

export class CreateRegionRequestDTO {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name should be a string' })
  name: string;

  @IsNotEmpty({ message: 'userId should not be empty' })
  @IsString({ message: 'userId should be a string' })
  userId: string;

  @IsNotEmpty({ message: 'coordinates should not be empty' })
  @ValidateNested({
    message: 'coordinates property must be an object with lat and lng data',
  })
  @Type(() => CoordinatesDTO)
  coordinates?: CoordinatesDTO;
}
