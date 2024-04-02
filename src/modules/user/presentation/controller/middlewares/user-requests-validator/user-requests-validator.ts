import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../../../../../shared/utils';
import { CreateUserRequestDTO } from './dto/user/create-user-request.dto';
import { UpdateUserRequestDTO } from './dto/user/update-user-request.dto';

class UserRequestsValidator {
  async createUserValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = plainToInstance(CreateUserRequestDTO, req.body);

      const errors = await validate(userData);

      if (errors.length > 0) {
        const errorData = errors.map((error) => ({
          param: error.property,
          nestedErrors: error.children.length
            ? error.children.map((child: any) => child.constraints)
            : null,
          errors: error.constraints,
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

  async updateUserValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = plainToInstance(UpdateUserRequestDTO, req.body);

      const errors = await validate(userData);

      if (errors.length > 0) {
        const errorData = errors.map((error) => ({
          param: error.property,
          nestedErrors: error.children.length
            ? error.children.map((child: any) => child.constraints)
            : null,
          errors: error.constraints,
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
