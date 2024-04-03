import { Region } from '../../../../../config/database/models/models';
import { NotFoundException, StatusCode } from '../../../../shared/utils';
import findOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';
import { FindRegionsByCoordinateDTO } from './dto/find-regions-by-coordinate.dto';

class FindRegionsByCoordinateUseCase {
  async execute(
    userId: string,
    { lat, lng }: FindRegionsByCoordinateDTO,
  ): Promise<{
    statusCode: number;
    data: {
      regions: Region[];
    };
  }> {
    const { data: user } = await findOneUserUseCase.execute({ _id: userId });

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const findRegions = await RegionRepository.findByCoordinate({
      lat,
      lng,
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

export default new FindRegionsByCoordinateUseCase();
