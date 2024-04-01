import UserRepository from '../../../../domain/repository/user.repository';
import deleteUserUseCase from '../delete-user-use-case';
import {
  mockAffectedDelete,
  mockDatabaseException,
  mockNotFoundException,
  mockUnaffectedDelete,
  mockUserFound,
} from './mocks/delete-user-use-case.mock';

jest.mock('../../../../domain/repository/user.repository');

describe('DeleteUserUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if there is no user to delete', async () => {
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(deleteUserUseCase.execute('some-id')).rejects.toThrow(
      mockNotFoundException,
    );
  });

  it('should throw DatabaseException if no user was deleted', async () => {
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(mockUserFound);
    (UserRepository.delete as jest.Mock).mockResolvedValueOnce(
      mockUnaffectedDelete,
    );

    await expect(deleteUserUseCase.execute('some-id')).rejects.toThrow(
      mockDatabaseException,
    );
  });

  it('should return statusCode 204 and data with message user was deleted', async () => {
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(mockUserFound);
    (UserRepository.delete as jest.Mock).mockResolvedValueOnce(
      mockAffectedDelete,
    );

    await expect(deleteUserUseCase.execute('some-id')).resolves.toEqual({
      statusCode: 204,
      data: { message: 'User deleted successfully!' },
    });
  });
});
