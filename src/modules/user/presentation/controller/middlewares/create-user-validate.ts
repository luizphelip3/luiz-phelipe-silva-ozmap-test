import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../../../shared/utils';
import { CreateUserRequestDTO } from './dto/create-user/create-user-request.dto';
import { FindUserRequestDTO } from './dto/find-user/find-user-request.dto';

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

        throw new ValidationError({
          message: 'Please, review the data sended.',
          details: errorData,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  async findOneUserValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const { id, name, email } = req.query;
      const newUser = new FindUserRequestDTO({ id, name, email });

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

        throw new ValidationError({
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
