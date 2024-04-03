import { NotFoundException } from '../../../../../../shared/utils';

export const mockFindRegionParams = {
  _id: 'id-example',
  email: 'test@example.com',
  name: 'Test Region',
};

export const mockNotFoundException = new NotFoundException({
  message: 'Region not found',
  details: {
    message: `Region not found with the following params`,
    params: Object.entries(mockFindRegionParams),
  },
});

export const mockRegionFromDatabase = {
  _id: '660d46e9627bc4df307da232',
  name: 'algum nome',
  coordinates: [-40.8136744, -14.8539052],
  user: '6605b269258702d2c7befa58',
  createdAt: '2024-04-03T12:09:13.619Z',
  updatedAt: '2024-04-03T12:09:13.619Z',
  __v: 0,
};
