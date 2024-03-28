import { NextFunction, Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/create-user/create-user-use-case';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {  
    try {
      const createdUser = await CreateUserUseCase.execute(req.body);
      return res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
