import { StatusCode } from '../../../../../shared/utils';
import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../../domain/repository/region.repository';
import FindRegionsByDistanceUseCase from '../find-regions-by-distance-use-case';
import {
    mockParams,
    mockParamsWithUserId,
    mockRegions,
    mockUser,
    mockUserNotFoundException,
} from './mocks/find-regions-by-distance-use-case.mock';

jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);

jest.mock('../../../../domain/repository/region.repository', () => ({
  findByDistance: jest.fn(),
}));

describe('FindRegionsByDistanceUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return regions for given coordinates and distance', async () => {
    (RegionRepository.findByDistance as jest.Mock).mockResolvedValueOnce(
      mockRegions,
    );

    const result = await FindRegionsByDistanceUseCase.execute(mockParams);

    expect(RegionRepository.findByDistance).toHaveBeenCalledWith({
      lat: mockParams.lat,
      lng: mockParams.lng,
      distance: mockParams.distance,
      user: null
    });

    expect(result).toEqual({
      statusCode: StatusCode.OK,
      data: {
        regions: mockRegions,
      },
    });
  });

  it('should return regions for given coordinates and distance and userId', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
        statusCode: 200,
        data: mockUser,
      });

      (RegionRepository.findByDistance as jest.Mock).mockResolvedValueOnce(
        mockRegions,
      );

    const result = await FindRegionsByDistanceUseCase.execute(mockParamsWithUserId);

    expect(RegionRepository.findByDistance).toHaveBeenCalledWith({
      lat: mockParams.lat,
      lng: mockParams.lng,
      distance: mockParams.distance,
      user: mockUser,
    });

    expect(result).toEqual({
      statusCode: StatusCode.OK,
      data: {
        regions: mockRegions,
      },
    });
  });

  it('should throw NotFoundException if user is not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      FindRegionsByDistanceUseCase.execute(mockParamsWithUserId),
    ).rejects.toThrow(mockUserNotFoundException);
  });
});
