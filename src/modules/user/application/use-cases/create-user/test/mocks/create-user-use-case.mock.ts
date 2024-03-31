import { ValidationException } from '../../../../../../shared/utils';

export const mockCreateUserDTOWithoutAddressNorCoordinates = {
  email: 'test@example.com',
  name: 'Test User',
};

export const mockCreateUserDTOWithAddressAndCoordinates = {
  email: 'test@example.com',
  name: 'Test User',
  address: {
    street: 'street',
    number: 'number',
    neighborhood: 'neighborhood',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
  },
  coordinates: {
    lat: 1234567,
    lng: 7654321,
  },
};

export const mockCreateUserDTOWithExistingEmail = {
  email: 'existing@example.com',
  name: 'Test User',
  address: {
    street: 'street',
    number: 'number',
    neighborhood: 'neighborhood',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
  },
};

export const mockCreateUserDTOWithAddress = {
  email: 'existing@example.com',
  name: 'Test User',
  address: {
    street: 'street',
    number: 'number',
    neighborhood: 'neighborhood',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
  },
};

export const mockCreateUserDTOWithCoordinates = {
  email: 'existing@example.com',
  name: 'Test User',
  coordinates: { lat: 1234567, lng: 7654321 },
};

export const mockUserFromDatabase = {
  _id: '6605b269258702d2c7befa58',
  name: 'Name',
  email: 'Email@email.com',
  address: 'Address',
  coordinates: [1234567, 7654321],
  regions: [],
  createdAt: '2024-03-28T18:09:45.370Z',
  updatedAt: '2024-03-28T18:09:45.370Z',
};

export const mockCoordinatesNorAddressProvidedException =
  new ValidationException({
    message: 'Address or coordinates must be provided!',
  });

export const mockCoordinatesAndAddressProvidedException =
  new ValidationException({
    message: 'Address and coordinates must not be provided together!',
  });

export const mockExistingEmailException = new ValidationException({
  message: 'This email is already being used!',
});
