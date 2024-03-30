import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty({ message: 'Street should not be empty' })
  @IsString({ message: 'Street should be a string' })
  street: string;

  @IsNotEmpty({ message: 'Number should not be empty' })
  @IsString({ message: 'Number should be a string' })
  number: string;

  @IsNotEmpty({ message: 'Neighborhood should not be empty' })
  @IsString({ message: 'Neighborhood should be a string' })
  neighborhood: string;

  @IsNotEmpty({ message: 'City should not be empty' })
  @IsString({ message: 'City should be a string' })
  city: string;

  @IsNotEmpty({ message: 'State should not be empty' })
  @IsString({ message: 'State should be a string' })
  @MaxLength(2, {message: 'State must have the maximum of 2 characters'})
  state: string;

  @IsNotEmpty({ message: 'Zip code should not be empty' })
  @IsString({ message: 'Zip code should be a string' })
  zip_code: string;
}
