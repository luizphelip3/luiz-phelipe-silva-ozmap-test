import { ValidationError } from '../../../../shared/utils/functions/error';
import { formatAddress } from '../../../../shared/utils/functions/format-address';
import { User } from '../../../domain/model/user.model';
import UserRepository from '../../../domain/repository/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

class CreateUserUseCase {
  async execute({ email, name, address, coordinates }: CreateUserDTO) {
    const userToCreate = new User();

    if (address) {
      userToCreate.address = formatAddress(address);
      userToCreate.coordinates = [123, 456];
    }

    if (coordinates) {
      userToCreate.address = 'ulala';
      userToCreate.coordinates = [coordinates.lat, coordinates.lng];
    }

    if (!coordinates && !address) {
      throw new ValidationError({
        message: 'Address or Coordinated must be provided!',
      });
    }

    userToCreate.name = name;
    userToCreate.email = email;

    const createdUser = await UserRepository.create(userToCreate);

    return createdUser;
  }
}

export default new CreateUserUseCase();
