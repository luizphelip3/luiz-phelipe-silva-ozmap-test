import { NotFoundException } from '../../../../../../shared/utils';

export const mockUpdateRegionDTOWithName = {
  name: 'Test Region',
};

export const mockUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  address: '123 Test St',
  coordinates: [30, 40],
  regions: [],
};

export const mockUpdateRegionDTOWithCoordinates = {
  coordinates: { lat: 1234567, lng: 7654321 },
};

export const mockUpdateRegionDTOWithCoordinatesFormatted = {
  coordinates: [7654321, 1234567],
};

export const mockRegionFromDatabase = {
  _id: '6605b269258702d2c7befa58',
  name: 'Name',
  coordinates: [1234567, 7654321],
  user: mockUser,
  createdAt: '2024-03-28T18:09:45.370Z',
  updatedAt: '2024-03-28T18:09:45.370Z',
};

export const mockNotFoundRegionException = new NotFoundException({
  message: 'Region not found!',
});

export const mockNotFoundUserException = new NotFoundException({
  message: 'User not found!',
});
