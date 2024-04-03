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
