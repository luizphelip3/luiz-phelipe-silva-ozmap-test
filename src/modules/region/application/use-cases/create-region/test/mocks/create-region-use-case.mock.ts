import {
  NotFoundException,
  ValidationException,
} from '../../../../../../shared/utils';

export const mockCreateRegionDTOWithUserNotFound = {
  name: 'name',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  userId: 'userId',
};

export const mockUserNotFoundException = new NotFoundException({
  message: 'User not found!',
});

export const mockCreateRegionDTO = {
  name: 'Test Region',
  coordinates: { lng: 10, lat: 20 },
  userId: 'user123',
};

export const mockUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  address: '123 Test St',
  coordinates: [30, 40],
  regions: [],
};

export const mockNewRegion = {
  _id: 'region456',
  name: mockCreateRegionDTO.name,
  user: mockUser._id,
  coordinates: [mockCreateRegionDTO.coordinates.lng, mockCreateRegionDTO.coordinates.lat],
};

export const mockRegionAlreadyRegisteredException =
  new ValidationException({
    message: 'Region already registered!',
  });
