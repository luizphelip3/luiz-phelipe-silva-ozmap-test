import { StatusCode } from '../../../../../shared/utils';
import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../../domain/repository/region.repository';
import UpdateRegionUseCase from '../update-region-use-case';
import {
  mockNotFoundRegionException,
  mockNotFoundUserException,
  mockRegionFromDatabase,
  mockUpdateRegionDTOWithCoordinates,
  mockUpdateRegionDTOWithCoordinatesFormatted,
  mockUpdateRegionDTOWithName,
  mockUser,
} from './mocks/update-region-use-case.mock';

jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);

jest.mock('../../../../domain/repository/region.repository');

describe('UpdateRegionUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if user was not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      UpdateRegionUseCase.execute('user-id', 'region-id', {}),
    ).rejects.toThrow(mockNotFoundUserException);
  });

  it('should throw NotFoundException if region was not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      statusCode: 200,
      data: mockUser,
    });

    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      UpdateRegionUseCase.execute('user-id', 'region-id', {}),
    ).rejects.toThrow(mockNotFoundRegionException);
  });

  it('should update the region successfully with name provided', async () => {
    const mockedUpdatedRegion = {
      statusCode: StatusCode.NO_CONTENT,
      data: {},
    };

    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      statusCode: 200,
      data: mockUser,
    });

    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockRegionFromDatabase,
    );

    (RegionRepository.update as jest.Mock).mockResolvedValueOnce(
      mockRegionFromDatabase,
    );

    await expect(
      UpdateRegionUseCase.execute(
        'region-id',
        'user-id',
        mockUpdateRegionDTOWithName,
      ),
    ).resolves.toEqual(mockedUpdatedRegion);

    expect(RegionRepository.update).toHaveBeenCalledWith(
      'region-id',
      mockUpdateRegionDTOWithName,
    );
  });

  it('should update a region successfully with coordinates provided', async () => {
    const mockedUpdatedRegion = {
      statusCode: StatusCode.NO_CONTENT,
      data: {},
    };

    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockRegionFromDatabase,
    );

    (RegionRepository.update as jest.Mock).mockResolvedValueOnce(
      mockRegionFromDatabase,
    );

    await expect(
      UpdateRegionUseCase.execute(
        'region-id',
        'user-id',
        mockUpdateRegionDTOWithCoordinates,
      ),
    ).resolves.toEqual(mockedUpdatedRegion);

    expect(RegionRepository.update).toHaveBeenCalledWith(
      'region-id',
      mockUpdateRegionDTOWithCoordinatesFormatted,
    );
  });
});
