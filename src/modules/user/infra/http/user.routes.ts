import { Router } from "express";
import userController from "../../presentation/controller/user.controller";
import UserRequestsValidator from "../../presentation/controller/middlewares/create-user-validate";

const userRouter = Router();

userRouter.post('/', UserRequestsValidator.createUserValidate, userController.createUser);
userRouter.get("/", userController.findOneUser);
userRouter.patch("/:id", async (req, res) => {
  return res.sendStatus(201);
});



export { userRouter };
