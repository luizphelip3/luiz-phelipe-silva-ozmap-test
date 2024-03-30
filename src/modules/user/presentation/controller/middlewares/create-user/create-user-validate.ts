import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../../../../../shared/utils';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';

class UserRequestsValidator {
  async createUserValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const newUser = new CreateUserRequestDTO(req.body);

      const errors = await validate(newUser);

      if (errors.length > 0) {
        const errorData = errors.map((error) => ({
          property: error.property,
          constraints: error.children.length
            ? error.children.map(
                (child: any) => child.constraints.nestedValidation,
              )
            : error.constraints,
        }));

        throw new ValidationException({
          message: 'Please, review the data sended.',
          details: errorData,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserRequestsValidator();
