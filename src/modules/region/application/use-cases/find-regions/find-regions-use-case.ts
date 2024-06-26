import { Region } from '../../../../../config/database/models/models';
import { NotFoundException, StatusCode } from '../../../../shared/utils';
import findOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindRegionsDTO } from './dto/find-regions.dto';

class FindRegionsUseCase {
  async execute(
    userId: string,
    { page, limit }: FindRegionsDTO,
  ): Promise<{
    statusCode: number;
    data: {
      regions: Region[];
      totalItems: number;
      totalPages: number;
      totalItemsPerPage: number;
    };
  }> {
    const { data: user } = await findOneUserUseCase.execute({ _id: userId });

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const findRegions = await RegionRepository.findAll({ page, limit, user });

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
