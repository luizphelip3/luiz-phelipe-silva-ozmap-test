import axios from 'axios';
import Geocoding from '../geocoding';
import {
  GEOCODING_REVERSE_URL,
  GEOCODING_URL,
  GOOGLE_GEOCODING_API_KEY,
} from '../../../../../config/env/env-config';
import { ExternalRequestException, ValidationException } from '../../../utils';
import { mockGeocodingFromAddressZipCode, mockGeocodingGetAddressFromCoordinatesInvalidStatusResponse, mockGeocodingGetAddressFromCoordinates, mockGeocodingGetAddressFromCoordinatesZeroResultsResponse, mockGeocodingFromAddressZipCodeZeroResultsResponse, mockGeocodingFromAddressZipCodeInvalidStatusResponse } from './mock/geocoding.mock';

jest.mock('axios');

describe('Geocoding', () => {
  it('should handle failure scenario for getAddressFromCoordinates when no results are returned', async () => {
    const coordinates = { lat: 40.7128, lng: -74.006 };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockGeocodingGetAddressFromCoordinatesZeroResultsResponse);

    await expect(Geocoding.getAddressFromCoordinates(coordinates)).rejects.toThrow(ValidationException);
  });

  it('should handle success scenario for getAddressFromCoordinates', async () => {
    const coordinates = { lat: 40.7128, lng: -74.006 };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockGeocodingGetAddressFromCoordinates);

    await expect(Geocoding.getAddressFromCoordinates(coordinates)).resolves.toBe('New York, NY, USA');
  });
  

  it('should handle failure scenario for getAddressFromCoordinates when geocoding API returns invalid response status', async () => {
    const coordinates = { lat: 40.7128, lng: -74.006 };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockGeocodingGetAddressFromCoordinatesInvalidStatusResponse);

    await expect(Geocoding.getAddressFromCoordinates(coordinates)).rejects.toThrow(ExternalRequestException);
  });

  it('should handle success scenario for getCoordinatesFromAddressZipCode', async () => {
    const zipCode = '10001';

    (axios.get as jest.Mock).mockResolvedValueOnce(mockGeocodingFromAddressZipCode);

    await expect(Geocoding.getCoordinatesFromAddressZipCode(zipCode)).resolves.toEqual({ lat: 40.7128, lng: -74.006 });
  });

  it('should handle failure scenario for getCoordinatesFromAddressZipCode when no results are returned', async () => {
    const zipCode = '10001';

    (axios.get as jest.Mock).mockResolvedValueOnce(mockGeocodingFromAddressZipCodeZeroResultsResponse);

    await expect(Geocoding.getCoordinatesFromAddressZipCode(zipCode)).rejects.toThrow(ValidationException);
  });

  it('should handle failure scenario for getCoordinatesFromAddressZipCode when geocoding API returns invalid response status', async () => {
    const zipCode = '10001';

    (axios.get as jest.Mock).mockResolvedValueOnce(mockGeocodingFromAddressZipCodeInvalidStatusResponse);

    await expect(Geocoding.getCoordinatesFromAddressZipCode(zipCode)).rejects.toThrow(ExternalRequestException);
  });
});
