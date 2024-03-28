import { Router } from "express";
import userController from "../../presentation/controller/user.controller";
import validateUser from "../../presentation/middlewares/validate-user";

const userRouter = Router();

userRouter.post('/', validateUser, userController.createUser);
userRouter.get("/:id", async (req, res) => {
  return res.sendStatus(201);
});
userRouter.patch("/:id", async (req, res) => {
  return res.sendStatus(201);
});



export { userRouter };
