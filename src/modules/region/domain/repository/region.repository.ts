import { Region, RegionModel } from '../../../../config/database/models/models';
import { DatabaseException } from '../../../shared/utils';
import {
  CreateRegionDTO,
  FindRegionDTO,
  FindAllRegionsDTO,
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
      return await RegionModel.findOne(params).populate('user');
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
  }: FindAllRegionsDTO): Promise<{ regions: Region[]; totalItems: number }> {
    try {
      const [regions, totalItems] = await Promise.all([
        RegionModel.find()
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

  async findByCoordinate(lat: number, lng: number): Promise<Region[]> {
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
      }).populate('user');
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find regions data.',
        details: error.message,
      });
    }
  }
}

export default new RegionRepository();
