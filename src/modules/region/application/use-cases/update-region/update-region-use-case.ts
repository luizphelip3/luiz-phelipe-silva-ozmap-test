import { Region } from '../../../../../config/database/models/models';
import {
  NotFoundException,
  ValidationException,
} from '../../../../shared/lib/error/error-types';
import { StatusCode } from '../../../../shared/utils';
import FindOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';
import { UpdateRegionDTO } from './dto/update-region-use-case.dto';

class UpdateRegionUseCase {
  async execute(
    regionId: string,
    userId: string,
    { name, coordinates }: UpdateRegionDTO,
  ): Promise<{ statusCode: number; data: {} }> {
    const { data: findUser } = await FindOneUserUseCase.execute({
      _id: userId,
    });

    if (!findUser) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const findRegion = await RegionRepository.findOne({
      _id: regionId,
      user: findUser,
    });

    if (!findRegion) {
      throw new ValidationException({
        message: 'Region not found!',
      });
    }

    let regionToUpdate = new Region()

    if (name) {
      regionToUpdate.name = name;
    }

    if (coordinates) {
      regionToUpdate.coordinates = [coordinates.lng, coordinates.lat];
    }

    await RegionRepository.update(regionId, regionToUpdate);

    return {
      statusCode: StatusCode.NO_CONTENT,
      data: {},
    };
  }
}

export default new UpdateRegionUseCase();
