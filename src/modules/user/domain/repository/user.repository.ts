import { DatabaseError } from '../../../shared/utils';
import { User, UserModel } from '../model/user.model';

class UserRepository {
  async create(user: User): Promise<User> {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw new DatabaseError({ message: 'Could not create user.' });
    }
  }
}

export default new UserRepository();
