import GeoLib from '../../../../shared/lib/geo-lib/geo-lib';
import { ValidationError } from '../../../../shared/utils/functions/error';
import { formatAddress } from '../../../../shared/utils/functions/format-address';
import { User } from '../../../domain/model/user.model';
import UserRepository from '../../../domain/repository/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

class CreateUserUseCase {
  async execute({ email, name, address, coordinates }: CreateUserDTO) {
    if (!coordinates && !address) {
      throw new ValidationError({
        message: 'Address or coordinates must be provided!',
      });
    }

    if (coordinates && address) {
      throw new ValidationError({
        message: 'Address and coordinates must be provided together!',
      });
    }

    const userToCreate = new User();

    if (address) {
      const { lat, lng } = await GeoLib.getCoordinatesFromAddressZipCode(
        address.zipCode,
      );
      userToCreate.address = formatAddress(address);
      userToCreate.coordinates = [lat, lng];
    }

    if (coordinates) {
      const address = await GeoLib.getAddressFromCoordinates(coordinates);
      userToCreate.address = address;
      userToCreate.coordinates = [coordinates.lat, coordinates.lng];
    }

    userToCreate.name = name;
    userToCreate.email = email;

    const createdUser = await UserRepository.create(userToCreate);

    return createdUser;
  }
}

export default new CreateUserUseCase();
