import { RegionModel } from '../../../../../config/database/models/models';
import { DatabaseException } from '../../../../shared/utils';
import RegionRepository from '../region.repository';
import {
    mockCreateRegionDTO,
    mockCreatedRegion,
    mockFindAllRegionsByCoordinateDTO,
    mockFindAllRegionsByDistanceDTO,
    mockFindAllRegionsDTO,
    mockFindRegionDTO,
    mockFoundRegion,
    mockFoundRegions,
} from './mocks/region.repository.mock';

jest.mock('../../../../../config/database/models/models');

describe('RegionRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a region successfully', async () => {
      (RegionModel.create as jest.Mock).mockResolvedValueOnce(
        mockCreatedRegion,
      );

      const result = await RegionRepository.create(mockCreateRegionDTO);

      expect(result).toEqual(mockCreatedRegion);
    });

    it('should throw a DatabaseException if creation fails', async () => {
      const error = new Error('Database error');
      (RegionModel.create as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        RegionRepository.create(mockCreateRegionDTO),
      ).rejects.toThrow(DatabaseException);
    });
  });

  describe('findOne', () => {
    it('should find a region successfully', async () => {
      (RegionModel.findOne as jest.Mock).mockResolvedValueOnce(mockFoundRegion);

      const result = await RegionRepository.findOne(mockFindRegionDTO);

      expect(result).toEqual(mockFoundRegion);
    });

    it('should throw a DatabaseException if finding fails', async () => {
      const error = new Error('Database error');
      (RegionModel.findOne as jest.Mock).mockRejectedValueOnce(error);

      await expect(RegionRepository.findOne(mockFindRegionDTO)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('findAll', () => {
    it('should find all regions successfully', async () => {
      (RegionModel.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValue(mockFoundRegions),
      });
      (RegionModel.count as jest.Mock).mockResolvedValue(
        mockFoundRegions.length,
      );

      const result = await RegionRepository.findAll(mockFindAllRegionsDTO);

      expect(result.regions).toEqual(mockFoundRegions);
      expect(result.totalItems).toEqual(mockFoundRegions.length);
    });

    it('should throw a DatabaseException when findAll fails', async () => {
      (RegionModel.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(
        RegionRepository.findAll(mockFindAllRegionsDTO),
      ).rejects.toThrow(DatabaseException);
    });
  });

  describe('findByCoordinate', () => {
    it('should find regions by coordinate successfully', async () => {
      (RegionModel.find as jest.Mock).mockResolvedValueOnce(mockFoundRegions);

      const result = await RegionRepository.findByCoordinate(
        mockFindAllRegionsByCoordinateDTO,
      );

      expect(result).toEqual(mockFoundRegions);
    });

    it('should throw a DatabaseException if finding by coordinate fails', async () => {
      const error = new Error('Database error');
      (RegionModel.find as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        RegionRepository.findByCoordinate(mockFindAllRegionsByCoordinateDTO),
      ).rejects.toThrow(DatabaseException);
    });
  });

  describe('findByDistance', () => {
    it('should find regions by distance successfully', async () => {
      (RegionModel.find as jest.Mock).mockResolvedValueOnce(mockFoundRegions);

      const result = await RegionRepository.findByDistance(
        mockFindAllRegionsByDistanceDTO,
      );

      expect(result).toEqual(mockFoundRegions);
    });

    it('should throw a DatabaseException if finding by distance fails', async () => {
      const error = new Error('Database error');
      (RegionModel.find as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        RegionRepository.findByDistance(mockFindAllRegionsByDistanceDTO),
      ).rejects.toThrow(DatabaseException);
    });
  });

  describe('delete', () => {
    it('should delete a region successfully', async () => {
      const regionId = '1234567890';

      (RegionModel.deleteOne as jest.Mock).mockResolvedValue({});

      const result = await RegionRepository.delete(regionId);

      expect(result).toEqual({});
    });

    it('should throw a DatabaseException when delete fails', async () => {
      const userId = '1234567890';

      (RegionModel.deleteOne as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(RegionRepository.delete(userId)).rejects.toThrow(
        DatabaseException,
      );
    });
  });

  describe('update', () => {
    it('should update a region successfully', async () => {
      const regionId = 'some_id';
      (RegionModel.updateOne as jest.Mock).mockResolvedValueOnce({});

      const result = await RegionRepository.update(regionId, { name: 'name' });

      expect(result).toEqual({});
    });

    it('should throw a DatabaseException if updating fails', async () => {
      const regionId = 'some_id';

      const error = new Error('Database error');
      (RegionModel.updateOne as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        RegionRepository.update(regionId, { name: 'name' }),
      ).rejects.toThrow(DatabaseException);
    });
  });
});
