import RegionRepository from '../../../../domain/repository/region.repository';
import findOneRegionUseCase from '../find-one-region-use-case';
import {
  mockFindRegionParams,
  mockNotFoundException,
  mockRegionFromDatabase,
} from './mocks/find-one-region-use-case.mock';

jest.mock('../../../../domain/repository/region.repository');

describe('FindRegionUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException none region was found with the passing parameters', async () => {
    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      findOneRegionUseCase.execute(mockFindRegionParams),
    ).rejects.toThrow(mockNotFoundException);
  });

  it('should return statusCode and data with region found with the passing parameters', async () => {
    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockRegionFromDatabase,
    );

    await expect(
      findOneRegionUseCase.execute(mockFindRegionParams),
    ).resolves.toEqual({ statusCode: 200, data: mockRegionFromDatabase });
  });
});
