import { DatabaseException } from '../../../shared/utils';
import { User, UserModel } from '../model/user.model';

class UserRepository {
  async create(user: User): Promise<User> {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not create user.',
        details: error.message,
      });
    }
  }

  async findOne(user: Partial<User>): Promise<User> {
    try {
      return await UserModel.findOne(user);
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find user.',
        details: error.message,
      });
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ users: User[]; totalItems: number }> {
    try {
      const [users, totalItems] = await Promise.all([
        UserModel.find()
          .limit(limit)
          .skip((page - 1) * limit),
        UserModel.count(),
      ]);

      return { users, totalItems };
    } catch (error) {
      throw new DatabaseException({
        message: 'Could not find user.',
        details: error.message,
      });
    }
  }

  async delete(id: string){
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
