import { NextFunction, Request, Response } from 'express';

import CreateRegionUseCase from '../../application/use-cases/create-region/create-region-use-case';
import FindOneRegionUseCase from '../../application/use-cases/find-one-region/find-one-region-use-case';
import FindRegionsByCoordinateUseCase from '../../application/use-cases/find-regions-by-coordinate/find-regions-by-coordinate-use-case';
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
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const { statusCode, data } = await FindRegionsUseCase.execute(userId, {
        page: Number(page),
        limit: Number(limit),
      });
      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async findOneRegion(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { id, name } = req.query;

      const { statusCode, data } = await FindOneRegionUseCase.execute(userId, {
        _id: id?.toString(),
        name: name?.toString(),
      });

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async findOneRegionByCoordinate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.params;

      const { lat, lng } = req.query;

      const { statusCode, data } = await FindRegionsByCoordinateUseCase.execute(
        userId,
        {
          lat: Number(lat),
          lng: Number(lng),
        },
      );

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new RegionController();
