import { NextFunction, Request, Response } from 'express';
import { CreateRegionDTO } from '../../application/use-cases/create-region/dto/create-region.dto';
import { UpdateRegionDTO } from '../../application/use-cases/update-region/dto/update-region-use-case.dto';
import CreateRegionUseCase from '../../application/use-cases/create-region/create-region-use-case';
import FindOneRegionUseCase from '../../application/use-cases/find-one-region/find-one-region-use-case';
import FindRegionsByCoordinateUseCase from '../../application/use-cases/find-regions-by-coordinate/find-regions-by-coordinate-use-case';
import FindRegionsByDistanceUseCase from '../../application/use-cases/find-regions-by-distance/find-regions-by-distance-use-case';
import FindRegionsUseCase from '../../application/use-cases/find-regions/find-regions-use-case';
import DeleteRegionUseCase from '../../application/use-cases/delete-region/delete-region-use-case';
import UpdateRegionUseCase from '../../application/use-cases/update-region/update-region-use-case';

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

  async findRegionsByCoordinate(
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

  async findRegionsByDistance(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, lng, distance, userId } = req.query;

      const { statusCode, data } = await FindRegionsByDistanceUseCase.execute({
        lat: Number(lat),
        lng: Number(lng),
        distance: Number(distance),
        userId: userId ? userId.toString() : null,
      });

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteRegion(req: Request, res: Response, next: NextFunction) {
    try {
      const { regionId, userId } = req.params;

      const { statusCode, data } = await DeleteRegionUseCase.execute(
        regionId?.toString(),
        userId?.toString(),
      );

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateRegion(req: Request, res: Response, next: NextFunction) {
    try {
      const { regionId, userId } = req.params;
      const updateRegionData: UpdateRegionDTO = req.body;

      const { statusCode, data } = await UpdateRegionUseCase.execute(
        regionId?.toString(),
        userId?.toString(),
        updateRegionData,
      );

      return res.status(statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new RegionController();
