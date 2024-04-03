import express from 'express';
import { initMongoDatabase } from './config/database/connection/mongo-db';
import { errorHandler } from './modules/shared/lib/error/error-handler';
import { userRouter } from './modules/user/infra/http/user.routes';
import { regionRouter } from './modules/region/infra/http/region.routes';

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
    this.server.use(regionRouter);
  }
}

export default new App();
