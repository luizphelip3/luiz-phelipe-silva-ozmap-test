import Geocoding from '../../../../shared/lib/geocoding/geocoding';
import {
  NotFoundException,
  StatusCode,
  ValidationException,
  formatAddress,
} from '../../../../shared/utils';
import UserRepository from '../../../domain/repository/user.repository';
import { UpdateUserDTO } from './dto/update-user.dto';

class UpdateUserUseCase {
  async execute(
    id: string,
    { email, name, address, coordinates }: UpdateUserDTO,
  ): Promise<{ statusCode: number; data: {} }> {
    if (coordinates && address) {
      throw new ValidationException({
        message: 'Address and coordinates must not be provided together!',
      });
    }

    const userToUpdate = await UserRepository.findOne({ _id: id });

    if (!userToUpdate) {
      throw new NotFoundException({
        message: 'User not found!',
      });
    }

    if (address) {
      const { lat, lng } = await Geocoding.getCoordinatesFromAddressZipCode(
        address.zipCode,
      );
      userToUpdate.address = formatAddress(address);
      userToUpdate.coordinates = [lat, lng];
    }

    if (coordinates) {
      const address = await Geocoding.getAddressFromCoordinates(coordinates);
      userToUpdate.address = address;
      userToUpdate.coordinates = [coordinates.lat, coordinates.lng];
    }

    userToUpdate.name = name ? name : userToUpdate.name;
    userToUpdate.email = email ? email : userToUpdate.email;

    await UserRepository.update(id, userToUpdate);

    return { statusCode: StatusCode.NO_CONTENT, data: {} };
  }
}

export default new UpdateUserUseCase()
