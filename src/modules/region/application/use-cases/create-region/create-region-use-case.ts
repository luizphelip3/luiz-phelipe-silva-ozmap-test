import {
  Region,
  RegionModel,
} from '../../../../../config/database/models/models';
import {
  NotFoundException,
  ValidationException,
} from '../../../../shared/lib/error/error-types';
import { StatusCode } from '../../../../shared/utils';
import FindOneUserUseCase from '../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../domain/repository/region.repository';
import { CreateRegionDTO } from './dto/create-region.dto';

class CreateRegionUseCase {
  async execute({
    name,
    coordinates,
    userId,
  }: CreateRegionDTO): Promise<{ statusCode: number; data: Region }> {
    const { data: user } = await FindOneUserUseCase.execute({ _id: userId });

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const region = await RegionRepository.findOne({
      user,
      coordinates: [coordinates.lat, coordinates.lng],
    });

    if (region) {
      throw new ValidationException({
        message: 'Region already registered!',
      });
    }

    const newRegion = await RegionRepository.create({
      name,
      user,
      coordinates: [coordinates.lat, coordinates.lng],
    });

    return { statusCode: StatusCode.CREATED, data: newRegion };
  }
}

export default new CreateRegionUseCase();
