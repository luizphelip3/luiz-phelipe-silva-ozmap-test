import { Region } from '../../../../../config/database/models/models';
import { NotFoundException, StatusCode } from '../../../../shared/utils';
import findOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindRegionsByDistanceDTO } from './dto/find-regions-by-distance.dto';

class FindRegionsByDistanceUseCase {
  async execute({
    lat,
    lng,
    distance,
    userId,
  }: FindRegionsByDistanceDTO): Promise<{
    statusCode: number;
    data: {
      regions: Region[];
    };
  }> {
    let user = null;

    if (userId) {
      const { data: findUser } = await findOneUserUseCase.execute({
        _id: userId,
      });

      if (!findUser) {
        throw new NotFoundException({ message: 'User not found!' });
      }

      user = findUser;
    }

    const findRegions = await RegionRepository.findByDistance({
      lat,
      lng,
      distance,
      user,
    });

    return {
      statusCode: StatusCode.OK,
      data: {
        regions: findRegions,
      },
    };
  }
}

export default new FindRegionsByDistanceUseCase();
