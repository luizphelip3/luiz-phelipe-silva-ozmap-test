import { NextFunction, Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user/create-user-use-case';
import DeleteUserUseCase from '../../application/use-cases/delete-user/delete-user-use-case';
import FindOneUserUseCase from '../../application/use-cases/find-one-user/find-one-user-use-case';
import FindUsersUseCase from '../../application/use-cases/find-users/find-users-use-case';
import UpdateUserUseCase from '../../application/use-cases/update-user/update-user-use-case';

import { CreateUserDTO } from '../../application/use-cases/create-user/dto/create-user.dto';
import { UpdateUserDTO } from '../../application/use-cases/update-user/dto/update-user.dto';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUserData: CreateUserDTO = req.body;

      const { statusCode, data } = await CreateUserUseCase.execute(newUserData);

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async findOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, email } = req.query;

      const { statusCode, data } = await FindOneUserUseCase.execute({
        _id: id?.toString(),
        name: name?.toString(),
        email: email?.toString(),
      });

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async findUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { statusCode, data } = await FindUsersUseCase.execute({
        page: Number(page),
        limit: Number(limit),
      });
      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateUserData: UpdateUserDTO = req.body;

      const { statusCode, data } = await UpdateUserUseCase.execute(
        id,
        updateUserData,
      );

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { statusCode, data } = await DeleteUserUseCase.execute(id);
      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
