import Geocoding from '../../../../../shared/lib/geocoding/geocoding';
import { StatusCode } from '../../../../../shared/utils';
import { User } from '../../../../domain/model/user.model';
import UserRepository from '../../../../domain/repository/user.repository';
import UpdateUserUseCase from '../update-user-use-case';
import {
  mockCoordinatesAndAddressProvidedException,
  mockExistingEmailException,
  mockNotFoundUserException,
  mockUpdateUserDTOWithAddress,
  mockUpdateUserDTOWithAddressAndCoordinates,
  mockUpdateUserDTOWithAddressFormatted,
  mockUpdateUserDTOWithCoordinates,
  mockUpdateUserDTOWithCoordinatesFormatted,
  mockUpdateUserDTOWithExistingEmail,
  mockUserFromDatabase,
} from './mocks/update-user-use-case.mock';

jest.mock('../../../../../shared/lib/geocoding/geocoding');
jest.mock('../../../../domain/repository/user.repository');

describe('UpdateUserUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw ValidationException if both coordinates and address are provided', async () => {
    await expect(
      UpdateUserUseCase.execute(
        'some-id',
        mockUpdateUserDTOWithAddressAndCoordinates,
      ),
    ).rejects.toThrow(mockCoordinatesAndAddressProvidedException);
  });

  it('should throw ValidationException if user to update was not found', async () => {
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(UpdateUserUseCase.execute('some-id', {})).rejects.toThrow(
      mockNotFoundUserException,
    );
  });

  it('should throw ValidationException if email is already in use', async () => {
    const existingUser: Partial<User> = { email: 'existing@example.com' };

    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(existingUser);
    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(existingUser);

    await expect(
      UpdateUserUseCase.execute('some-id', mockUpdateUserDTOWithExistingEmail),
    ).rejects.toThrow(mockExistingEmailException);
  });

  it('should update the user successfully with address provided', async () => {
    const mockedUpdatedUser = {
      statusCode: StatusCode.NO_CONTENT,
      data: {},
    };

    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    (
      Geocoding.getCoordinatesFromAddressZipCode as jest.Mock
    ).mockResolvedValueOnce({ lat: 0, lng: 0 });
    (UserRepository.update as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    await expect(
      UpdateUserUseCase.execute('some-id', mockUpdateUserDTOWithAddress),
    ).resolves.toEqual(mockedUpdatedUser);

    expect(UserRepository.update).toHaveBeenCalledWith(
      'some-id',
      mockUpdateUserDTOWithAddressFormatted,
    );
  });

  it('should update a user successfully with coordinates provided', async () => {
    const mockedUpdatedUser = {
      statusCode: StatusCode.NO_CONTENT,
      data: {},
    };

    (UserRepository.findOne as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    (Geocoding.getAddressFromCoordinates as jest.Mock).mockResolvedValueOnce(
      'Test Address',
    );

    (UserRepository.update as jest.Mock).mockResolvedValueOnce(
      mockUserFromDatabase,
    );

    await expect(
      UpdateUserUseCase.execute('some-id', mockUpdateUserDTOWithCoordinates),
    ).resolves.toEqual(mockedUpdatedUser);

    expect(UserRepository.update).toHaveBeenCalledWith(
      'some-id',
      mockUpdateUserDTOWithCoordinatesFormatted,
    );
  });
});
