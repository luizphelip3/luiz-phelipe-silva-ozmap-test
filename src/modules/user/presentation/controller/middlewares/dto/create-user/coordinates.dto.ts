import { IsNotEmpty, IsNumber, IsDefined, ValidateNested } from 'class-validator';

export class CoordinatesDTO {
  @IsDefined({ message: 'Latitude is required' })
  @ValidateNested()
  @IsNotEmpty({ message: 'Latitude should not be empty' })
  @IsNumber({}, { message: 'Latitude should be a number' })
  lat: number;

  @IsDefined({ message: 'Longitude is required' })
  @ValidateNested()
  @IsNotEmpty({ message: 'Longitude should not be empty' })
  @IsNumber({}, { message: 'Longitude should be a number' })
  lng: number;
}