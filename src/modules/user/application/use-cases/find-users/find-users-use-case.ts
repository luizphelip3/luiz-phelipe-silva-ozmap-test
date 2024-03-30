import { StatusCode } from '../../../../shared/utils';
import { User } from '../../../domain/model/user.model';
import UserRepository from '../../../domain/repository/user.repository';
import { FindUsersDTO } from './dto/find-users.dto';

class FindUsersUseCase {
  async execute({ page, limit }: FindUsersDTO): Promise<{
    statusCode: number;
    data: {
      users: User[];
      totalItems: number;
      totalItemsPerPage: number;
      totalPages: number;
    };
  }> {
    const findUser = await UserRepository.findAll(page, limit);

    return {
      statusCode: StatusCode.OK,
      data: {
        ...findUser,
        totalPages: Math.ceil(findUser.totalItems / limit),
        totalItemsPerPage: limit,
      },
    };
  }
}

export default new FindUsersUseCase();
