import { User, UserModel } from '../../../../config/database/models/models';
import { DatabaseException } from '../../../shared/utils';
import {
  CreateUserDTO,
  FindAllUsersDTO,
  FindUserDTO,
} from './dto/user.repository.dto';

class UserRepository {
  async create(params: CreateUserDTO): Promise<User> {
    try {
      return await UserModel.create(params);
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not create user.',
        details: error.message,
      });
    }
  }

  async findOne(params: FindUserDTO): Promise<User> {
    try {
      return await UserModel.findOne(params);
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find user.',
        details: error.message,
      });
    }
  }

  async findAll({
    limit,
    page,
  }: FindAllUsersDTO): Promise<{ users: User[]; totalItems: number }> {
    try {
      const [users, totalItems] = await Promise.all([
        UserModel.find().limit(limit).skip((page - 1) * limit),
        UserModel.count(),
      ]);

      return { users, totalItems };
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find user data.',
        details: error.message,
      });
    }
  }

  async delete(id: string) {
    try {
      const user = await UserModel.deleteOne({ _id: id });

      return user;
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not delete user',
        details: error.message,
      });
    }
  }

  async update(id: string, user: Partial<User>) {
    try {
      return await UserModel.updateOne({ _id: id }, user);
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not delete user',
        details: error.message,
      });
    }
  }
}

export default new UserRepository();
