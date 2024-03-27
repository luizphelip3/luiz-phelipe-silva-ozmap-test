import * as express from "express";
import { userRouter } from "./modules/user/infra/http/routes";

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.routes();
  }

  routes() {
    this.server.use(userRouter);
  }
}

export default new App();
