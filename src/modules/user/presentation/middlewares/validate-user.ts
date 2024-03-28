import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { CreateUserRequestDTO } from '../dto/create-user-request.dto';
import { ValidationError } from '../../../shared/utils';

export default async function validateUser(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const newUser = new CreateUserRequestDTO(req.body);

    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new ValidationError({message: errors})
    }
    next();
  } catch (error) {
    next(error);
  }
}
