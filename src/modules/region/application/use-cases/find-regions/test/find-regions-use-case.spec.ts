import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../../domain/repository/region.repository';
import findRegionsUseCase from '../find-regions-use-case';
import {
  mockFindRegionsParams,
  mockResultFromDatabase,
  mockUser,
  mockUserNotFoundException,
} from './mocks/find-regions-use-case.mock';

jest.mock('../../../../domain/repository/region.repository');
jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);

describe('FindRegionsUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if user is not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      findRegionsUseCase.execute(mockUser._id, mockFindRegionsParams),
    ).rejects.toThrow(mockUserNotFoundException);
  });

  it('should return statusCode and data with search infos', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      statusCode: 200,
      data: mockUser,
    });

    (RegionRepository.findAll as jest.Mock).mockResolvedValueOnce(
      mockResultFromDatabase,
    );

    await expect(
      findRegionsUseCase.execute(mockUser._id, mockFindRegionsParams),
    ).resolves.toEqual({
      statusCode: 200,
      data: {
        ...mockResultFromDatabase,
        totalPages: Math.ceil(
          mockResultFromDatabase.totalItems / mockFindRegionsParams.limit,
        ),
        totalItemsPerPage: mockFindRegionsParams.limit,
      },
    });
  });
});
