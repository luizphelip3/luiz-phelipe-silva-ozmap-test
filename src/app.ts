import express from 'express';
import { initMongoDatabase } from './config/database/mongo-db';
import { errorHandler } from './modules/shared/lib/error/error-handler';
import { userRouter } from './modules/user/infra/http/user.routes';

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.routes();
    this.middlewares();
  }

  middlewares() {
    this.server.use(errorHandler);
  }

  database() {
    initMongoDatabase();
  }

  routes() {
    this.server.use(express.json());
    this.server.use(userRouter);
  }
}

export default new App();
