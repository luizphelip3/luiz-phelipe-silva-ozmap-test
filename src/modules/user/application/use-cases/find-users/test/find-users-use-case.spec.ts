import UserRepository from '../../../../domain/repository/user.repository';
import findUsersUseCase from '../find-users-use-case';
import {
  mockFindUsersParams,
  mockResultFromDatabase,
} from './mocks/find-users-use-case.mock';

jest.mock('../../../../domain/repository/user.repository');

describe('FindUsersUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return statusCode and data with search infos', async () => {
    (UserRepository.findAll as jest.Mock).mockResolvedValueOnce(
      mockResultFromDatabase,
    );

    await expect(
      findUsersUseCase.execute(mockFindUsersParams),
    ).resolves.toEqual({
      statusCode: 200,
      data: {
        ...mockResultFromDatabase,
        totalPages: Math.ceil(
          mockResultFromDatabase.totalItems / mockFindUsersParams.limit,
        ),
        totalItemsPerPage: mockFindUsersParams.limit,
      },
    });
  });
});
