import { IsNotEmpty, IsNumber } from 'class-validator';

export class CoordinatesDTO {
  @IsNotEmpty({ message: 'Latitude should not be empty' })
  @IsNumber({}, { message: 'Latitude should be a number' })
  lat: number;

  @IsNotEmpty({ message: 'Longitude should not be empty' })
  @IsNumber({}, { message: 'Longitude should be a number' })
  lng: number;
}
