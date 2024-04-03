import RegionRepository from '../../../../domain/repository/region.repository';
import findOneRegionUseCase from '../find-one-region-use-case';
import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import {
  mockFindRegionParams,
  mockFindRegionWithUserNotFoundParams,
  mockNotFoundException,
  mockRegionFromDatabase,
  mockUser,
  mockUserNotFoundException,
} from './mocks/find-one-region-use-case.mock';

jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);
jest.mock('../../../../domain/repository/region.repository');

describe('FindRegionUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException none user was found with the passing parameters', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      findOneRegionUseCase.execute(
        mockUser._id,
        mockFindRegionWithUserNotFoundParams,
      ),
    ).rejects.toThrow(mockUserNotFoundException);
  });

  it('should throw NotFoundException none region was found with the passing parameters', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      statusCode: 200,
      data: mockUser,
    });

    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      findOneRegionUseCase.execute(mockUser._id, mockFindRegionParams),
    ).rejects.toThrow(mockNotFoundException);
  });

  it('should return statusCode and data with region found with the passing parameters', async () => {
    (RegionRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockRegionFromDatabase,
    );

    await expect(
      findOneRegionUseCase.execute(mockUser._id, mockFindRegionParams),
    ).resolves.toEqual({ statusCode: 200, data: mockRegionFromDatabase });
  });
});
