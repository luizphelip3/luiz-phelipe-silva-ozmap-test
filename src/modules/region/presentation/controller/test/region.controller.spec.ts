import { Request, Response } from 'express';
import CreateRegionUseCase from '../../../application/use-cases/create-region/create-region-use-case';
import DeleteRegionUseCase from '../../../application/use-cases/delete-region/delete-region-use-case';
import FindOneRegionUseCase from '../../../application/use-cases/find-one-region/find-one-region-use-case';
import FindRegionsByCoordinateUseCase from '../../../application/use-cases/find-regions-by-coordinate/find-regions-by-coordinate-use-case';
import FindRegionsByDistanceUseCase from '../../../application/use-cases/find-regions-by-distance/find-regions-by-distance-use-case';
import FindRegionsUseCase from '../../../application/use-cases/find-regions/find-regions-use-case';
import UpdateRegionUseCase from '../../../application/use-cases/update-region/update-region-use-case';
import RegionController from '../region.controller';

jest.mock(
  '../../../application/use-cases/create-region/create-region-use-case',
);
jest.mock(
  '../../../application/use-cases/find-one-region/find-one-region-use-case',
);
jest.mock('../../../application/use-cases/find-regions/find-regions-use-case');
jest.mock(
  '../../../application/use-cases/find-regions-by-coordinate/find-regions-by-coordinate-use-case',
);
jest.mock(
  '../../../application/use-cases/find-regions-by-distance/find-regions-by-distance-use-case',
);
jest.mock(
  '../../../application/use-cases/update-region/update-region-use-case',
);
jest.mock(
  '../../../application/use-cases/delete-region/delete-region-use-case',
);

describe('RegionController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  describe('createRegion', () => {
    it('should create a region', async () => {
      const mockRequestData = {
        body: {
          name: 'name',
          coordinates: {
            lat: 123,
            lng: 456,
          },
        },
      };

      const mockResponseData = {
        statusCode: 201,
        data: { message: 'Region created successfully' },
      };

      (CreateRegionUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.createRegion(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(CreateRegionUseCase.execute).toHaveBeenCalledWith(
        mockRequestData.body,
      );
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (CreateRegionUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      await RegionController.createRegion(
        req as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('findOneRegion', () => {
    it('should find a region', async () => {
      const mockRequestData = {
        query: {
          id: '123',
          name: 'name',
        },
        params: {
          userId: 'userId',
        },
      };

      const mockResponseData = {
        statusCode: 200,
        data: { id: '123', name: 'name' },
      };

      (FindOneRegionUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.findOneRegion(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(FindOneRegionUseCase.execute).toHaveBeenCalledWith('userId', {
        _id: '123',
        name: 'name',
      });

      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (FindOneRegionUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      const mockRequestData = {
        query: {},
        params: {},
      };

      await RegionController.findOneRegion(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('findRegions', () => {
    it('should find regions', async () => {
      const mockRequestData = {
        query: {
          page: 1,
          limit: 10,
        },
        params: {
          userId: 'userId',
        },
      };

      const mockResponseData = {
        statusCode: 200,
        data: [
          { id: '1', name: 'name' },
          { id: '2', name: 'name2' },
        ],
      };

      (FindRegionsUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.findRegions(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(FindRegionsUseCase.execute).toHaveBeenCalledWith('userId', {
        page: 1,
        limit: 10,
      });
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (FindRegionsUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      const mockRequestData = {
        query: {},
        params: {},
      };

      await RegionController.findRegions(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('findRegionsByCoordinate', () => {
    it('should find regionsByCoordinate', async () => {
      const mockRequestData = {
        query: {
          lat: 123,
          lng: 456,
        },
        params: {
          userId: 'userId',
        },
      };

      const mockResponseData = {
        statusCode: 200,
        data: [
          { id: '1', name: 'name' },
          { id: '2', name: 'name2' },
        ],
      };

      (FindRegionsByCoordinateUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.findRegionsByCoordinate(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(FindRegionsByCoordinateUseCase.execute).toHaveBeenCalledWith(
        'userId',
        {
          lat: 123,
          lng: 456,
        },
      );
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (FindRegionsByCoordinateUseCase.execute as jest.Mock).mockRejectedValue(
        mockError,
      );

      const mockRequestData = {
        query: {},
        params: {},
      };

      await RegionController.findRegionsByCoordinate(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('findRegionsByDistance', () => {
    it('should find regionsByDistance', async () => {
      const mockRequestData = {
        query: {
          lat: 123,
          lng: 456,
          distance: 10,
          userId: 'userId',
        },
      };

      const mockResponseData = {
        statusCode: 200,
        data: [
          { id: '1', name: 'name' },
          { id: '2', name: 'name2' },
        ],
      };

      (FindRegionsByDistanceUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.findRegionsByDistance(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(FindRegionsByDistanceUseCase.execute).toHaveBeenCalledWith({
        lat: 123,
        lng: 456,
        distance: 10,
        userId: 'userId',
      });
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (FindRegionsByDistanceUseCase.execute as jest.Mock).mockRejectedValue(
        mockError,
      );

      const mockRequestData = {
        query: {},
        params: {},
      };

      await RegionController.findRegionsByDistance(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateRegion', () => {
    it('should update a region', async () => {
      const mockRequestData = {
        params: {
          regionId: '123',
          userId: '456',
        },
        body: {
          name: 'Updated name',
        },
      };

      const mockResponseData = {
        statusCode: 200,
        data: { message: 'Region updated successfully' },
      };

      (UpdateRegionUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.updateRegion(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(UpdateRegionUseCase.execute).toHaveBeenCalledWith('123', '456', {
        name: 'Updated name',
      });
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (UpdateRegionUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      const mockRequestData = {
        params: {},
        body: {},
      };

      await RegionController.updateRegion(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteRegion', () => {
    it('should delete a region', async () => {
      const mockRequestData = {
        params: {
          regionId: '123',
          userId: '456',
        },
      };

      const mockResponseData = {
        statusCode: 200,
        data: { message: 'Region deleted successfully' },
      };

      (DeleteRegionUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await RegionController.deleteRegion(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(DeleteRegionUseCase.execute).toHaveBeenCalledWith('123', '456');
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (DeleteRegionUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      const mockRequestData = {
        params: {},
      };

      await RegionController.deleteRegion(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
