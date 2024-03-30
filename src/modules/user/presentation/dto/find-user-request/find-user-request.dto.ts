import { IsOptional, IsString } from 'class-validator';

export class FindUserRequestDTO {
  @IsOptional()
  @IsString({ message: 'Id should be a string' })
  id?: string;

  @IsOptional()
  @IsString({ message: 'Name should be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Email should be a string' })
  email?: string;

  constructor(props: {
    id: any;
    name: any;
    email: any;
  }) {
    Object.assign(this, props);
  }
}
