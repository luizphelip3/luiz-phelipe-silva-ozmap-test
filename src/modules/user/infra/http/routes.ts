import { Router } from "express";

const userRouter = Router();

userRouter.get("/user", async (req, res) => {
  return res.sendStatus(201);
});

userRouter.get("/users/:id", async (req, res) => {
  return res.sendStatus(201);
});

userRouter.put("/users/:id", async (req, res) => {
  return res.sendStatus(201);
});

export { userRouter };
