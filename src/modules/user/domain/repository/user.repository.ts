import { DatabaseError } from '../../../shared/utils';
import { User, UserModel } from '../model/user.model';

class UserRepository {
  async create(user: User): Promise<User> {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw new DatabaseError({ message: 'Could not create user.', details: error.message });
    }
  }

  async findOne(user: Partial<User>): Promise<User> {
    try {
      return await UserModel.findOne(user);
    } catch (error) {
      throw new DatabaseError({ message: 'Could not find user.', details: error.message });
    }
  }
}

export default new UserRepository();
