import { NotFoundException } from '../../../../../../shared/utils';

export const mockFindUserParams = {
  _id: 'id-example',
  email: 'test@example.com',
  name: 'Test User',
};

export const mockNotFoundException = new NotFoundException({
  message: 'User not found',
  details: {
    message: `User not found with as params`,
    params: Object.entries(mockFindUserParams),
  },
});

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
