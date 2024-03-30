import { Router } from 'express';
import UserRequestsValidator from '../../presentation/controller/middlewares/create-user/create-user-validate';
import userController from '../../presentation/controller/user.controller';

const userRouter = Router();

userRouter.post(
  '/user',
  UserRequestsValidator.createUserValidate,
  userController.createUser,
);
userRouter.get('/user', userController.findOneUser);
userRouter.get('/users', userController.findUsers);
userRouter.delete('/users/:id', userController.deleteUser)

export { userRouter };
