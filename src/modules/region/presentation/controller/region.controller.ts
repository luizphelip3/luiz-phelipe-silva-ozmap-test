import { NextFunction, Request, Response } from 'express';

import createRegionUseCase from '../../application/use-cases/create-region/create-region-use-case';
import { CreateRegionDTO } from '../../application/use-cases/create-region/dto/create-region.dto';

class RegionController {
  async createRegion(req: Request, res: Response, next: NextFunction) {
    try {
      const newRegionData: CreateRegionDTO = req.body;

      const { statusCode, data } = await createRegionUseCase.execute(
        newRegionData,
      );

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new RegionController();
