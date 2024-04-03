import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CoordinatesDTO } from '../../../../../shared/utils/dtos/coordinates/coordinates.dto';

export class UpdateRegionRequestDTO {
  @IsOptional()
  @IsString({ message: 'name should be a string' })
  name: string;

  @IsOptional()
  @ValidateNested({
    message: 'coordinates property must be an object with lat and lng data',
  })
  @Type(() => CoordinatesDTO)
  coordinates?: CoordinatesDTO;
}
