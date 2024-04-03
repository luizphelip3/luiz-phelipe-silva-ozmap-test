import RegionRepository from '../../../../domain/repository/region.repository';
import findRegionsUseCase from '../find-regions-use-case';
import {
  mockFindRegionsParams,
  mockResultFromDatabase,
} from './mocks/find-regions-use-case.mock';

jest.mock('../../../../domain/repository/region.repository');

describe('FindRegionsUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return statusCode and data with search infos', async () => {
    (RegionRepository.findAll as jest.Mock).mockResolvedValueOnce(
      mockResultFromDatabase,
    );

    await expect(
      findRegionsUseCase.execute(mockFindRegionsParams),
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
