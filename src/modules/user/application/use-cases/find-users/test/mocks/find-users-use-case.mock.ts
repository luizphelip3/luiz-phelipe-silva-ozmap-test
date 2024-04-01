export const mockFindUsersParams = {
  page: 1,
  limit: 10,
};

const user = {
  _id: '6605b269258702d2c7befa58',
  name: 'Name',
  email: 'Email@email.com',
  address: 'Address',
  coordinates: [1234567, 7654321],
  regions: [],
  createdAt: '2024-03-28T18:09:45.370Z',
  updatedAt: '2024-03-28T18:09:45.370Z',
};

export const mockResultFromDatabase = {
  users: [user],
  totalItems: 1,
};
