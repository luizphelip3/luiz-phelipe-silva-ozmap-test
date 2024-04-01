import {
  NotFoundException,
  ValidationException,
} from '../../../../../../shared/utils';

export const mockUpdateUserDTOWithAddressAndCoordinates = {
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

export const mockUpdateUserDTOWithExistingEmail = {
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

export const mockUpdateUserDTOWithAddress = {
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

export const mockUpdateUserDTOWithAddressFormatted = {
  email: 'existing@example.com',
  name: 'Test User',
  address: 'street, number - neighborhood, city - state, zipCode, country',
  coordinates: [0, 0],
};

export const mockUpdateUserDTOWithCoordinates = {
  email: 'existing@example.com',
  name: 'Test User',
  coordinates: { lat: 1234567, lng: 7654321 },
};

export const mockUpdateUserDTOWithCoordinatesFormatted = {
  email: 'existing@example.com',
  name: 'Test User',
  coordinates: [1234567, 7654321],
  address: 'Test Address',
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

export const mockCoordinatesAndAddressProvidedException =
  new ValidationException({
    message: 'Address and coordinates must not be provided together!',
  });

export const mockExistingEmailException = new ValidationException({
  message: 'This email is already being used!',
});

export const mockNotFoundUserException = new NotFoundException({
  message: 'User not found!',
});
