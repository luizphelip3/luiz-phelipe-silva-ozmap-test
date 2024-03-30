import Geocoding from '../../../../shared/lib/geocoding/geocoding';
import { StatusCode } from '../../../../shared/utils';
import { ValidationException } from '../../../../shared/lib/error/error-types';
import { formatAddress } from '../../../../shared/utils/functions/format-address';
import { User } from '../../../domain/model/user.model';
import UserRepository from '../../../domain/repository/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

class CreateUserUseCase {
  async execute({
    email,
    name,
    address,
    coordinates,
  }: CreateUserDTO): Promise<{ statusCode: number; data: User }> {
    if (!coordinates && !address) {
      throw new ValidationException({
        message: 'Address or coordinates must be provided!',
      });
    }

    if (coordinates && address) {
      throw new ValidationException({
        message: 'Address and coordinates must not be provided together!',
      });
    }

    const findUser = await UserRepository.findOne({ email });

    if (findUser) {
      throw new ValidationException({
        message: 'This email is already being used!',
      });
    }

    const userToCreate = new User();

    if (address) {
      const { lat, lng } = await Geocoding.getCoordinatesFromAddressZipCode(
        address.zipCode,
      );
      userToCreate.address = formatAddress(address);
      userToCreate.coordinates = [lat, lng];
    }

    if (coordinates) {
      const address = await Geocoding.getAddressFromCoordinates(coordinates);
      userToCreate.address = address;
      userToCreate.coordinates = [coordinates.lat, coordinates.lng];
    }

    userToCreate.name = name;
    userToCreate.email = email;

    const createdUser = await UserRepository.create(userToCreate);

    return { statusCode: StatusCode.CREATED, data: createdUser };
  }
}

export default new CreateUserUseCase();
