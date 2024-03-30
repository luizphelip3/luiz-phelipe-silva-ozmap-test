import { NextFunction, Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user/create-user-use-case';
import { StatusCode } from '../../../shared/utils';
import findOneUserUseCase from '../../application/use-cases/find-one-user/find-one-user-use-case';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createdUser = await CreateUserUseCase.execute(req.body);
      return res.status(createdUser.statusCode).json(createdUser.data);
    } catch (error) {
      next(error);
    }
  }

  async findOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      let { id, name, email } = req.query;
      const findUser = await findOneUserUseCase.execute({
        id: id?.toString(),
        name: name?.toString(),
        email: email?.toString(),
      });
      return res.status(findUser.statusCode).json(findUser.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
