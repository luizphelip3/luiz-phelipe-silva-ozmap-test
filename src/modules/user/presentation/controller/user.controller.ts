import { NextFunction, Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user/create-user-use-case';
import FindOneUserUseCase from '../../application/use-cases/find-one-user/find-one-user-use-case';
import FindUsersUseCase from '../../application/use-cases/find-users/find-users-use-case';

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
      const findUser = await FindOneUserUseCase.execute({
        id: id?.toString(),
        name: name?.toString(),
        email: email?.toString(),
      });
      return res.status(findUser.statusCode).json(findUser.data);
    } catch (error) {
      next(error);
    }
  }

  async findUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const users = await FindUsersUseCase.execute({ page: Number(page), limit: Number(limit) });
      return res.status(users.statusCode).json(users.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
