import { StatusCode } from '../../../../../shared/utils';
import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../../domain/repository/region.repository';
import FindRegionsByCoordinateUseCase from '../find-regions-by-coordinate-use-case';
import {
  mockParams,
  mockRegions,
  mockUser,
  mockUserNotFoundException,
} from './mocks/find-regions-by-coordinate-use-case.mock';

jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);

jest.mock('../../../../domain/repository/region.repository', () => ({
  findByCoordinate: jest.fn(),
}));

describe('FindRegionsByCoordinateUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return regions for given coordinates', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      statusCode: 200,
      data: mockUser,
    });

    (RegionRepository.findByCoordinate as jest.Mock).mockResolvedValueOnce(
      mockRegions,
    );

    const result = await FindRegionsByCoordinateUseCase.execute(
      mockUser._id,
      mockParams,
    );

    expect(RegionRepository.findByCoordinate).toHaveBeenCalledWith({
      lat: mockParams.lat,
      lng: mockParams.lng,
      user: mockUser,
    });

    expect(result).toEqual({
      statusCode: StatusCode.OK,
      data: {
        regions: mockRegions,
      },
    });
  });

  it('should throw an error if region lookup fails', async () => {
    const errorMessage = 'Test error message';
    (RegionRepository.findByCoordinate as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await expect(
      FindRegionsByCoordinateUseCase.execute(mockUser._id, mockParams),
    ).rejects.toThrow(errorMessage);
  });

  it('should throw NotFoundException if user is not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      FindRegionsByCoordinateUseCase.execute(mockUser._id, mockParams),
    ).rejects.toThrow(mockUserNotFoundException);
  });
});
