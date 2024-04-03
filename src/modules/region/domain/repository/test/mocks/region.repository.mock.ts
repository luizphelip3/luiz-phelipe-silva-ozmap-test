import { User } from '../../../../../../config/database/models/models';
import {
  CreateRegionDTO,
  FindAllRegionsByCoordinateDTO,
  FindAllRegionsByDistanceDTO,
  FindAllRegionsDTO,
  FindRegionDTO,
} from '../../dto/region.repository.dto';

export const mockUser: User = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  address: '123 Test St',
  coordinates: [30, 40],
  regions: [],
};

export const mockCreatedRegion = {
  _id: '6605b269258702d2c7befa58',
  name: 'name',
  coordinates: [1234567, 7654321],
  user: mockUser,
  createdAt: '2024-03-28T18:09:45.370Z',
  updatedAt: '2024-03-28T18:09:45.370Z',
};

export const mockCreateRegionDTO: CreateRegionDTO = {
  name: 'name',
  user: mockUser,
  coordinates: [1234567, 7654321],
};

export const mockFindRegionDTO: FindRegionDTO = {
  name: 'name',
  user: mockUser,
};

export const mockFoundRegion = {
  _id: '6605b269258702d2c7befa58',
  name: 'name',
  coordinates: [1234567, 7654321],
  user: mockUser,
  createdAt: '2024-03-28T18:09:45.370Z',
  updatedAt: '2024-03-28T18:09:45.370Z',
};

export const mockFindAllRegionsDTO: FindAllRegionsDTO = {
  page: 1,
  limit: 10,
  user: mockUser,
};

export const mockFoundRegions = [
  {
    _id: '6605b269258702d2c7befa58',
    name: 'name',
    coordinates: [1234567, 7654321],
    user: mockUser,
    createdAt: '2024-03-28T18:09:45.370Z',
    updatedAt: '2024-03-28T18:09:45.370Z',
  },
];

export const mockFindAllRegionsByCoordinateDTO: FindAllRegionsByCoordinateDTO =
  {
    lat: 123,
    lng: 456,
    user: mockUser,
  };

export const mockFindAllRegionsByDistanceDTO: FindAllRegionsByDistanceDTO = {
  lat: 123,
  lng: 456,
  distance: 10,
  user: mockUser,
};
