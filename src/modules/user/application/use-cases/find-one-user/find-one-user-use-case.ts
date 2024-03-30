import { NotFoundException } from '../../../../shared/lib/error/error-types';
import { StatusCode } from '../../../../shared/utils';
import { removeNullAndUndefinedParams } from '../../../../shared/utils/functions/remove-undefined-params';
import { User } from '../../../domain/model/user.model';
import UserRepository from '../../../domain/repository/user.repository';
import { FindOneUserDTO } from './dto/find-one-user.dto';

class FindOneUserUseCase {
  async execute(
    input: FindOneUserDTO,
  ): Promise<{ statusCode: number; data: User }> {
    const params: Partial<User> = removeNullAndUndefinedParams(input)

    const findUser = await UserRepository.findOne(params);

    if (!findUser) {
      throw new NotFoundException({
        message: 'User not found',
        details: {
          message: `User not found with params`,
          params: Object.entries(params),
        },
      });
    }

    return { statusCode: StatusCode.CREATED, data: findUser };
  }
}

export default new FindOneUserUseCase();

