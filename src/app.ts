import express from "express";
import { userRouter } from "./modules/user/infra/http/user.routes";
import "./config/database/mongo-db";

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.routes();
  }

  routes() {
    this.server.use(express.json());
    this.server.use('/user', userRouter);
  }
}

export default new App();
