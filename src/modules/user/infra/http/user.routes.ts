import { Router } from 'express';
import UserRequestsValidator from '../../presentation/controller/middlewares/user-requests-validator/user-requests-validator';
import userController from '../../presentation/controller/user.controller';

const userRouter = Router();

userRouter.post(
  '/user',
  UserRequestsValidator.createUserValidate,
  userController.createUser,
);
userRouter.get('/user', userController.findOneUser);
userRouter.get('/users', userController.findUsers);
userRouter.delete('/user/:id', userController.deleteUser);
userRouter.patch(
  '/user/:id',
  UserRequestsValidator.updateUserValidate,
  userController.updateUser,
);

export { userRouter };

