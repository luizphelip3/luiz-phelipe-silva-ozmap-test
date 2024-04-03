import { Region, RegionModel } from '../../../../config/database/models/models';
import { DatabaseException } from '../../../shared/utils';
import { CreateRegionDTO, FindRegionDTO } from './dto/region.repository.dto';

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
      console.log(error);
      throw new DatabaseException({
        message: 'Error while finding region',
        details: error.message,
      });
    }
  }
}

export default new RegionRepository();
