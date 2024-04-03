import { NotFoundException } from "../../../../../../shared/utils";

export const mockFindRegionsParams = {
  page: 1,
  limit: 10,
};

const region = {
  _id: '660d46e9627bc4df307da232',
  name: 'algum nome',
  coordinates: [-40.8136744, -14.8539052],
  user: '6605b269258702d2c7befa58',
  createdAt: '2024-04-03T12:09:13.619Z',
  updatedAt: '2024-04-03T12:09:13.619Z',
  __v: 0,
};

export const mockResultFromDatabase = {
  users: [region],
  totalItems: 1,
};

export const mockUser = {
  _id: 'user123',
  name: 'Test User',
  email: 'test@example.com',
  address: '123 Test St',
  coordinates: [30, 40],
  regions: [],
};

export const mockUserNotFoundException = new NotFoundException({
  message: 'User not found!',
});