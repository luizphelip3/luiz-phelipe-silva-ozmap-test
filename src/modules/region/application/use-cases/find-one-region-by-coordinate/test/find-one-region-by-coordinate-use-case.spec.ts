import { StatusCode } from '../../../../../shared/utils';
import RegionRepository from '../../../../domain/repository/region.repository';
import FindOneRegionByCoordinateUseCase from '../find-one-region-by-coordinate-use-case';

jest.mock('../../../../domain/repository/region.repository', () => ({
  findByCoordinate: jest.fn(),
}));

describe('FindOneRegionByCoordinateUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return regions for given coordinates', async () => {
    const mockRegions = [{ name: 'Region 1' }, { name: 'Region 2' }];
    (RegionRepository.findByCoordinate as jest.Mock).mockResolvedValueOnce(mockRegions);

    const lat = 123;
    const lng = 456;

    const result = await FindOneRegionByCoordinateUseCase.execute({ lat, lng });

    expect(RegionRepository.findByCoordinate).toHaveBeenCalledWith(lat, lng);
    expect(result).toEqual({
      statusCode: StatusCode.OK,
      data: {
        regions: mockRegions,
      },
    });
  });

  it('should throw an error if region lookup fails', async () => {
    const errorMessage = 'Test error message';
    (RegionRepository.findByCoordinate as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const lat = 123;
    const lng = 456;

    await expect(FindOneRegionByCoordinateUseCase.execute({ lat, lng })).rejects.toThrow(errorMessage);
  });
});