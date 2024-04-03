import CreateRegionUseCase from '../create-region-use-case';
import FindOneUserUseCase from '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case';
import RegionRepository from '../../../../domain/repository/region.repository';
import {
  NotFoundException,
  ValidationException,
} from '../../../../../shared/lib/error/error-types';
import { StatusCode } from '../../../../../shared/utils';
import { CreateRegionDTO } from '../dto/create-region.dto';
import { mockCreateRegionDTO, mockCreateRegionDTOWithUserNotFound, mockNewRegion, mockRegionAlreadyRegisteredException, mockUser, mockUserNotFoundException } from './mocks/create-region-use-case.mock';

jest.mock(
  '../../../../../user/application/use-cases/find-one-user/find-one-user-use-case',
  () => ({
    execute: jest.fn(),
  }),
);

jest.mock('../../../../domain/repository/region.repository', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe('CreateRegionUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new region successfully', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({
      statusCode: 200,
      data: mockUser,
    });

    (RegionRepository.findOne as jest.Mock).mockResolvedValue(null);

    (RegionRepository.create as jest.Mock).mockResolvedValue(mockNewRegion);

    const result = await CreateRegionUseCase.execute(mockCreateRegionDTO);

    expect(result.statusCode).toBe(StatusCode.CREATED);
    expect(result.data).toEqual(mockNewRegion);
    expect(FindOneUserUseCase.execute).toHaveBeenCalledWith({ _id: mockCreateRegionDTO.userId });
    expect(RegionRepository.findOne).toHaveBeenCalledWith({
      coordinates: [mockCreateRegionDTO.coordinates.lng, mockCreateRegionDTO.coordinates.lat],
    });
    expect(RegionRepository.create).toHaveBeenCalledWith({
      name: mockCreateRegionDTO.name,
      user: mockUser,
      coordinates: [mockCreateRegionDTO.coordinates.lng, mockCreateRegionDTO.coordinates.lat],
    });
  });

  it('should throw NotFoundException when user is not found', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: null });

    await expect(
      CreateRegionUseCase.execute(mockCreateRegionDTOWithUserNotFound),
    ).rejects.toThrow(mockUserNotFoundException);

    expect(FindOneUserUseCase.execute).toHaveBeenCalledWith({ _id: mockCreateRegionDTOWithUserNotFound.userId });
    expect(RegionRepository.findOne).not.toHaveBeenCalled();
    expect(RegionRepository.create).not.toHaveBeenCalled();
  });

  it('should throw ValidationException when region with same coordinates already exists', async () => {
    (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue({ data: mockUser });
    (RegionRepository.findOne as jest.Mock).mockResolvedValue({
      _id: 'existing_region_id',
    });

    await expect(
      CreateRegionUseCase.execute(mockCreateRegionDTO),
    ).rejects.toThrow(mockRegionAlreadyRegisteredException);

    expect(FindOneUserUseCase.execute).toHaveBeenCalledWith({ _id: mockCreateRegionDTO.userId });
    expect(RegionRepository.findOne).toHaveBeenCalledWith({
      coordinates: [mockCreateRegionDTO.coordinates.lng, mockCreateRegionDTO.coordinates.lat],
    });
    expect(RegionRepository.create).not.toHaveBeenCalled();
  });
});
