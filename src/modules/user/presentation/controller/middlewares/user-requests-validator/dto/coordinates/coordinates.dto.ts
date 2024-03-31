import { IsDefined, IsNumber } from 'class-validator';

export class CoordinatesDTO {
  @IsDefined()
  @IsNumber({}, { message: 'lat should be a number' })
  lat: number;

  @IsDefined()
  @IsNumber({}, { message: 'lng should be a number' })
  lng: number;
}
