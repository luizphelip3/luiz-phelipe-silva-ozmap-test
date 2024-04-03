import { NotFoundException } from "../../../../../../shared/utils";

export const mockRegions = [{ name: 'Region 1' }, { name: 'Region 2' }];

export const mockParams = { lat: 123, lng: 456, distance: 1 };
export const mockParamsWithUserId = { lat: 123, lng: 456, distance: 1, userId: 'userId'};


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
