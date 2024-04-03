import { Region } from '../../../../../config/database/models/models';
import { StatusCode } from '../../../../shared/utils';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindRegionsDTO } from './dto/find-regions.dto';

class FindRegionsUseCase {
  async execute({ page, limit }: FindRegionsDTO): Promise<{
    statusCode: number;
    data: {
      regions: Region[];
      totalItems: number;
      totalPages: number;
      totalItemsPerPage: number;
    };
  }> {
    const findRegions = await RegionRepository.findAll({ page, limit });

    return {
      statusCode: StatusCode.OK,
      data: {
        ...findRegions,
        totalPages: Math.ceil(findRegions.totalItems / limit),
        totalItemsPerPage: limit,
      },
    };
  }
}

export default new FindRegionsUseCase();
