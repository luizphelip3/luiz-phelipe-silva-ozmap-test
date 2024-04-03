import {
  DatabaseException,
  NotFoundException,
} from '../../../../../../shared/utils';

export const mockUnaffectedDelete = {
  acknowledged: true,
  deletedCount: 0,
};

export const mockDatabaseException = new DatabaseException({
  message: 'Fail during region deleting, no data was modified.',
});

export const mockUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  address: '123 Test St',
  coordinates: [30, 40],
  regions: [],
};

export const mockRegion = { name: 'name' };

export const mockUserNotFoundException = new NotFoundException({
  message: 'User not found!',
});

export const mockRegionNotFoundException = new NotFoundException({
  message: 'Region not found!',
});

export const mockAffectedDelete = {
  acknowledged: true,
  deletedCount: 1,
};
