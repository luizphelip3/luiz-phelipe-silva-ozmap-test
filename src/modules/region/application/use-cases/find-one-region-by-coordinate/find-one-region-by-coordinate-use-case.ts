import { Region } from '../../../../../config/database/models/models';
import { StatusCode } from '../../../../shared/utils';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindOneRegionByCoordinateDTO } from './dto/find-one-region-by-coordinate.dto';

class FindOneRegionByCoordinateUseCase {
  async execute({ lat, lng }: FindOneRegionByCoordinateDTO): Promise<{
    statusCode: number;
    data: {
      regions: Region[];
    };
  }> {
    const findRegions = await RegionRepository.findByCoordinate(lat, lng);

    return {
      statusCode: StatusCode.OK,
      data: {
        regions: findRegions,
      },
    };
  }
}

export default new FindOneRegionByCoordinateUseCase();
