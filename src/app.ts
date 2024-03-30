import express from "express";
import { userRouter } from "./modules/user/infra/http/user.routes";
import "./config/database/mongo-db";
import { errorHandler } from "./modules/shared/lib/error/error-handler";

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(errorHandler);
  }

  routes() {
    this.server.use(express.json());
    this.server.use('/user', userRouter);
  }
}

export default new App();
