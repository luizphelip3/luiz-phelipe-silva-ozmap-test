import {
    DatabaseException,
    NotFoundException,
    StatusCode,
} from '../../../../shared/utils';
import findOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';

class DeleteRegionUseCase {
  async execute(
    regionId: string,
    userId: string,
  ): Promise<{
    statusCode: number;
    data: {
      message: string;
    };
  }> {
    const { data: user } = await findOneUserUseCase.execute({ _id: userId });

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const region = await RegionRepository.findOne({ _id: regionId, user });

    if (!region) {
      throw new NotFoundException({ message: 'Region not found!' });
    }

    const deleteRegion = await RegionRepository.delete(regionId);

    if (deleteRegion.deletedCount < 1) {
      throw new DatabaseException({
        message: 'Fail during region deleting, no data was modified.',
      });
    }

    return {
      statusCode: StatusCode.NO_CONTENT,
      data: { message: 'Region deleted successfully!' },
    };
  }
}

export default new DeleteRegionUseCase();
