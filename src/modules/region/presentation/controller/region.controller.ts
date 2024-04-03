import { NextFunction, Request, Response } from 'express';

import CreateRegionUseCase from '../../application/use-cases/create-region/create-region-use-case';
import FindRegionsUseCase from '../../application/use-cases/find-regions/find-regions-use-case';
import { CreateRegionDTO } from '../../application/use-cases/create-region/dto/create-region.dto';

class RegionController {
  async createRegion(req: Request, res: Response, next: NextFunction) {
    try {
      const newRegionData: CreateRegionDTO = req.body;

      const { statusCode, data } = await CreateRegionUseCase.execute(
        newRegionData,
      );

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async findRegions(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { statusCode, data } = await FindRegionsUseCase.execute({
        page: Number(page),
        limit: Number(limit),
      });
      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new RegionController();
