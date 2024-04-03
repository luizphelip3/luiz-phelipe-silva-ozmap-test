import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../../../../shared/utils';
import { CreateRegionRequestDTO } from './dto/create-region-request.dto';
import { UpdateRegionRequestDTO } from './dto/update-region-request.dto';

class RegionRequestsValidator {
  async createRegionValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = plainToInstance(CreateRegionRequestDTO, req.body);

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

  async updateRegionValidate(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData = plainToInstance(UpdateRegionRequestDTO, req.body);

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

export default new RegionRequestsValidator();
