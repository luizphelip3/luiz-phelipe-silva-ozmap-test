import {
  Region,
  RegionModel,
  User,
} from '../../../../config/database/models/models';
import { DatabaseException } from '../../../shared/utils';
import {
  CreateRegionDTO,
  FindRegionDTO,
  FindAllRegionsDTO,
  FindAllRegionsByCoordinateDTO,
  FindAllRegionsByDistanceDTO,
} from './dto/region.repository.dto';

class RegionRepository {
  async create(params: CreateRegionDTO): Promise<Region> {
    try {
      return await RegionModel.create(params);
    } catch (error) {
      throw new DatabaseException({
        message: 'Error while creating region',
        details: error.message,
      });
    }
  }

  async findOne(params: FindRegionDTO): Promise<Region> {
    try {
      return await RegionModel.findOne(params);
    } catch (error) {
      throw new DatabaseException({
        message: 'Error while finding region',
        details: error.message,
      });
    }
  }

  async findAll({
    limit,
    page,
    user,
  }: FindAllRegionsDTO): Promise<{ regions: Region[]; totalItems: number }> {
    try {
      const [regions, totalItems] = await Promise.all([
        RegionModel.find({ user })
          .limit(limit)
          .skip((page - 1) * limit),
        RegionModel.count(),
      ]);

      return { regions, totalItems };
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find regions data.',
        details: error.message,
      });
    }
  }

  async findByCoordinate({
    lat,
    lng,
    user,
  }: FindAllRegionsByCoordinateDTO): Promise<Region[]> {
    try {
      return await RegionModel.find({
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          },
        },
        user,
      });
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find regions data.',
        details: error.message,
      });
    }
  }

  async findByDistance({
    lat,
    lng,
    distance,
    user,
  }: FindAllRegionsByDistanceDTO): Promise<Region[]> {
    try {
      const query = {
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: distance,
          },
        },
      };

      if (user) {
        query['user'] = user;
      }

      return await RegionModel.find(query);
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find regions data.',
        details: error.message,
      });
    }
  }
}

export default new RegionRepository();
