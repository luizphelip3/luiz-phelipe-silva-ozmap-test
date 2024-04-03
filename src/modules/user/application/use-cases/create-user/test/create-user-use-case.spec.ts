import { User } from '../../../../../../config/database/models/models';
import Geocoding from '../../../../../shared/lib/geocoding/geocoding';
import { StatusCode } from '../../../../../shared/utils';
import UserRepository from '../../../../domain/repository/user.repository';
import CreateUserUseCase from '../create-user-use-case';
import {
  mockCoordinatesAndAddressProvidedException,
  mockCoordinatesNorAddressProvidedException,
  mockCreateUserDTOWithAddress,
  mockCreateUserDTOWithAddressAndCoordinates,
  mockCreateUserDTOWithCoordinates,
  mockCreateUserDTOWithExistingEmail,
  mockCreateUserDTOWithoutAddressNorCoordinates,
  mockExistingEmailException,
  mockUserFromDatabase,
} from './mocks/create-user-use-case.mock';

jest.mock('../../../../../shared/lib/geocoding/geocoding');
jest.mock('../../../../domain/repository/user.repository');

describe('CreateUserUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw ValidationException if neither coordinates nor address are provided', async () => {
    await expect(
      CreateUserUseCase.execute(mockCreateUserDTOWithoutAddressNorCoordinates),
    ).rejects.toThrow(mockCoordinatesNorAddressProvidedException);
  });

  it('should throw ValidationException if both coordinates and address are provided', async () => {
    await expect(
      CreateUserUseCase.execute(mockCreateUserDTOWithAddressAndCoordinates),
    ).rejects.toThrow(mockCoordinatesAndAddressProvidedException);
  });

  it('should throw ValidationException if email is already in use', async () => {
    const existingUser: Partial<User> = { email: 'existing@example.com' };

    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(existingUser);

    await expect(
      CreateUserUseCase.execute(mockCreateUserDTOWithExistingEmail),
    ).rejects.toThrow(mockExistingEmailException);
  });

  it('should create a user successfully with address provided', async () => {
    const mockedCreatedUser = {
      statusCode: StatusCode.CREATED,
      data: mockUserFromDatabase,
    };

    (
      Geocoding.getCoordinatesFromAddressZipCode as jest.Mock
    ).mockResolvedValueOnce({ lat: 0, lng: 0 });
    (UserRepository.create as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    await expect(
      CreateUserUseCase.execute(mockCreateUserDTOWithAddress),
    ).resolves.toEqual(mockedCreatedUser);
  });

  it('should create a user successfully with coordinates provided', async () => {
    const mockedCreatedUser = {
      statusCode: StatusCode.CREATED,
      data: mockUserFromDatabase,
    };

    (Geocoding.getAddressFromCoordinates as jest.Mock).mockResolvedValueOnce(
      'Test Address',
    );
    (UserRepository.create as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    await expect(
      CreateUserUseCase.execute(mockCreateUserDTOWithCoordinates),
    ).resolves.toEqual(mockedCreatedUser);
  });
});
