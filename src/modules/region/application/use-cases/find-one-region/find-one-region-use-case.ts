import { Region } from '../../../../../config/database/models/models';
import { NotFoundException } from '../../../../shared/lib/error/error-types';
import { StatusCode } from '../../../../shared/utils';
import { removeNullAndUndefinedParams } from '../../../../shared/utils/functions/remove-undefined-params';
import findOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindOneRegionDTO } from './dto/find-one-region.dto';

class FindOneRegionUseCase {
  async execute(userId: string,
    input: FindOneRegionDTO,
  ): Promise<{ statusCode: number; data: Region }> {

    const { data: user } = await findOneUserUseCase.execute({ _id: userId });

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const params: Partial<Region> = removeNullAndUndefinedParams(input);

    const findRegion = await RegionRepository.findOne({...params, user});

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
