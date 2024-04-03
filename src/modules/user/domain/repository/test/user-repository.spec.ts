import UserRepository from '../user.repository';
import { DatabaseException } from '../../../../shared/utils';
import { CreateUserDTO } from '../dto/user.repository.dto';
import { UserModel } from '../../../../../config/database/models/models';

jest.mock('../../../../../config/database/models/models');

describe('UserRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const user: CreateUserDTO = {
        name: 'Test User',
        email: 'test@example.com',
        address: 'Test Address',
        coordinates: [0, 0],
      };
      const createdUser = { ...user, _id: '1234567890' };

      (UserModel.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await UserRepository.create(user);

      expect(result).toEqual(createdUser);
    });

    it('should throw a DatabaseException when creation fails', async () => {
      const user: CreateUserDTO = {
        name: 'Test User',
        email: 'test@example.com',
        address: 'Test Address',
        coordinates: [0, 0],
      };

      (UserModel.create as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(UserRepository.create(user)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('findOne', () => {
    it('should find a user successfully', async () => {
      const userQuery = { name: 'Test User' };
      const foundUser = { ...userQuery, _id: '1234567890' };

      (UserModel.findOne as jest.Mock).mockResolvedValue(foundUser);

      const result = await UserRepository.findOne(userQuery);

      expect(result).toEqual(foundUser);
    });

    it('should throw a DatabaseException when findOne fails', async () => {
      const userQuery = { name: 'Test User' };

      (UserModel.findOne as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(UserRepository.findOne(userQuery)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('findAll', () => {
    it('should find all users successfully', async () => {
      const users = [{ name: 'User 1' }, { name: 'User 2' }];
      const totalItems = 2;

      (UserModel.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValue(users),
      });
      (UserModel.count as jest.Mock).mockResolvedValue(totalItems);

      const result = await UserRepository.findAll({ limit: 10, page: 1 });

      expect(result.users).toEqual(users);
      expect(result.totalItems).toEqual(totalItems);
    });

    it('should throw a DatabaseException when findAll fails', async () => {
      (UserModel.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(
        UserRepository.findAll({ limit: 10, page: 1 }),
      ).rejects.toThrow(DatabaseException);
    });
  });

  describe('delete', () => {
    it('should delete a user successfully', async () => {
      const userId = '1234567890';

      (UserModel.deleteOne as jest.Mock).mockResolvedValue({});

      const result = await UserRepository.delete(userId);

      expect(result).toEqual({});
    });

    it('should throw a DatabaseException when delete fails', async () => {
      const userId = '1234567890';

      (UserModel.deleteOne as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(UserRepository.delete(userId)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const userId = '1234567890';
      const updatedUser = { name: 'Updated User' };

      (UserModel.updateOne as jest.Mock).mockResolvedValue({});

      const result = await UserRepository.update(userId, updatedUser);

      expect(result).toEqual({});
    });

    it('should throw a DatabaseException when update fails', async () => {
      const userId = '1234567890';
      const updatedUser = { name: 'Updated User' };

      (UserModel.updateOne as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(UserRepository.update(userId, updatedUser)).rejects.toThrow(
        DatabaseException,
      );
    });
  });
});
