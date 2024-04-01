import UserRepository from '../../../../domain/repository/user.repository';
import findOneUserUseCase from '../find-one-user-use-case';
import {
  mockFindUserParams,
  mockNotFoundException,
  mockUserFromDatabase,
} from './mocks/find-one-user-use-case.mock';

jest.mock('../../../../domain/repository/user.repository');

describe('FindUserUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException none user was found with the passing parameters', async () => {
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      findOneUserUseCase.execute(mockFindUserParams),
    ).rejects.toThrow(mockNotFoundException);
  });

  it('should return statusCode and data with user found with the passing parameters', async () => {
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    await expect(
      findOneUserUseCase.execute(mockFindUserParams),
    ).resolves.toEqual({ statusCode: 200, data: mockUserFromDatabase });
  });
});
