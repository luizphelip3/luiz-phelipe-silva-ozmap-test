import { Region } from '../../../../../config/database/models/models';
import { NotFoundException } from '../../../../shared/lib/error/error-types';
import { StatusCode } from '../../../../shared/utils';
import { removeNullAndUndefinedParams } from '../../../../shared/utils/functions/remove-undefined-params';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindOneRegionDTO } from './dto/find-one-region.dto';

class FindOneRegionUseCase {
  async execute(
    input: FindOneRegionDTO,
  ): Promise<{ statusCode: number; data: Region }> {
    const params: Partial<Region> = removeNullAndUndefinedParams(input);

    const findRegion = await RegionRepository.findOne(params);

    if (!findRegion) {
      throw new NotFoundException({
        message: 'Region not found',
        details: {
          message: `Region not found with the following params`,
          params: Object.entries(params),
        },
      });
    }

    return { statusCode: StatusCode.OK, data: findRegion };
  }
}

export default new FindOneRegionUseCase();
