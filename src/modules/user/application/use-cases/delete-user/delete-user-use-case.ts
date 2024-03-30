import {
    DatabaseException,
    NotFoundException,
    StatusCode
} from '../../../../shared/utils';
import UserRepository from '../../../domain/repository/user.repository';

class DeleteUserUseCase {
  async execute(_id: string) {
    const findUser = await UserRepository.findOne({ _id });

    if (!findUser) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    const deleteUser = await UserRepository.delete(findUser._id);

    if (deleteUser.deletedCount < 1) {
      throw new DatabaseException({
        message: 'Fail during user deleting, no data was modified.',
        statusCode: StatusCode.NOT_MODIFIED,
      });
    }

    return {
      statusCode: StatusCode.NO_CONTENT,
      data: { message: 'User deleted successfully!' },
    };
  }
}

export default new DeleteUserUseCase();
