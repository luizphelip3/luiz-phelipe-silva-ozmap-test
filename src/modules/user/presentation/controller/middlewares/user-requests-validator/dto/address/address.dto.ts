import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class AddressDTO {
  @IsDefined({ message: 'street is required' })
  @IsNotEmpty({ message: 'street should not be empty' })
  @IsString({ message: 'street should be a string' })
  street: string;

  @IsDefined({ message: 'number is required' })
  @IsNotEmpty({ message: 'number should not be empty' })
  @IsString({ message: 'number should be a string' })
  number: string;

  @IsDefined({ message: 'neighborhood is required' })
  @IsNotEmpty({ message: 'neighborhood should not be empty' })
  @IsString({ message: 'neighborhood should be a string' })
  neighborhood: string;

  @IsDefined({ message: 'city is required' })
  @IsNotEmpty({ message: 'city should not be empty' })
  @IsString({ message: 'city should be a string' })
  city: string;

  @IsDefined({ message: 'state is required' })
  @IsNotEmpty({ message: 'state should not be empty' })
  @IsString({ message: 'state should be a string' })
  @MaxLength(2, { message: 'state must have the maximum of 2 characters' })
  state: string;

  @IsDefined({ message: 'zipCode is required' })
  @IsNotEmpty({ message: 'zipCode should not be empty' })
  @IsString({ message: 'zipCode should be a string' })
  zipCode: string;
}
