import { DatabaseException, NotFoundException } from '../../../../../../shared/utils';

export const mockNotFoundException = new NotFoundException({
  message: 'User not found!',
});

export const mockUserFound = {
  _id: '6605b269258702d2c7befa58',
  name: 'Name',
  email: 'Email@email.com',
  address: 'Address',
  coordinates: [1234567, 7654321],
  regions: [],
  createdAt: '2024-03-28T18:09:45.370Z',
  updatedAt: '2024-03-28T18:09:45.370Z',
};

export const mockUnaffectedDelete = {
  acknowledged: true,
  deletedCount: 0,
};

export const mockDatabaseException = new DatabaseException({
  message: 'Fail during user deleting, no data was modified.',
});

export const mockAffectedDelete = {
    acknowledged: true,
    deletedCount: 1,
  };
