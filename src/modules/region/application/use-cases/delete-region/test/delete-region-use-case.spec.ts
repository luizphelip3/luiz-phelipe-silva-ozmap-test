import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../../domain/repository/region.repository';
import DeleteRegionUseCase from '../delete-region-use-case';
import {
  mockAffectedDelete,
  mockDatabaseException,
  mockRegion,
  mockRegionNotFoundException,
  mockUnaffectedDelete,
  mockUser,
  mockUserNotFoundException,
} from './mocks/delete-region-use-case.mock';

jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);

jest.mock('../../../../domain/repository/region.repository');

describe('DeleteRegionUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw NotFoundException if user is not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      DeleteRegionUseCase.execute('some-region-id', 'some-user-id'),
    ).rejects.toThrow(mockUserNotFoundException);
  });

  it('should throw NotFoundException if region is not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      data: mockUser,
    });
    (RegionRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      DeleteRegionUseCase.execute('some-region-id', 'some-user-id'),
    ).rejects.toThrow(mockRegionNotFoundException);
  });

  it('should throw DatabaseException if no region was deleted', async () => {
    (RegionRepository.findOne as jest.Mock).mockResolvedValue(mockRegion);
    (RegionRepository.delete as jest.Mock).mockResolvedValue(
      mockUnaffectedDelete,
    );

    await expect(
      DeleteRegionUseCase.execute('some-region-id', 'some-user-id'),
    ).rejects.toThrow(mockDatabaseException);
  });

  it('should return statusCode 204 and data with message region was deleted', async () => {
    (RegionRepository.delete as jest.Mock).mockResolvedValueOnce(
      mockAffectedDelete,
    );

    await expect(
      DeleteRegionUseCase.execute('some-region-id', 'some-user-id'),
    ).resolves.toEqual({
      statusCode: 204,
      data: { message: 'Region deleted successfully!' },
    });
  });
});
