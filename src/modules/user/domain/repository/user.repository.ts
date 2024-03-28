import { DatabaseError } from '../../../shared/utils';
import { User, UserModel } from '../model/user.model';

class UserRepository {
  async create(user: User): Promise<User> {
    try {
      console.log(user);
      return await UserModel.create(user);
    } catch (error) {
      console.log(error);
      throw new DatabaseError({ message: 'Could not create user.' });
    }
  }
}

export default new UserRepository();
