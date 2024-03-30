import axios from 'axios';
import {
  GEOCODING_REVERSE_URL,
  GEOCODING_URL,
  GOOGLE_GEOCODING_API_KEY,
} from '../../../../config/env/env-config';
import { ExternalRequestException, ValidationException } from '../../utils';
import { GeocodingResponse } from './types/geocoding.type';

class Geocoding {
  async getAddressFromCoordinates(coordinates: {
    lat: number;
    lng: number;
  }): Promise<string> {
    try {
      const geocodingRequest = await axios.get(
        `${GEOCODING_REVERSE_URL}${coordinates.lat},${coordinates.lng}&key=${GOOGLE_GEOCODING_API_KEY}`,
      );

      let geocodingResponse: GeocodingResponse = geocodingRequest.data;

      if (
        !geocodingResponse.results.length ||
        geocodingResponse.status === 'ZERO_RESULTS'
      ) {
        throw new ValidationException({
          message: 'Geocoding API returned no results',
        });
      }

      if (geocodingResponse.status !== 'OK') {
        throw new ExternalRequestException({
          message: 'Geocoding API returned invalid response status',
        });
      }

      return geocodingResponse.results[0].formatted_address;
    } catch (error) {
      throw new ExternalRequestException({
        message: 'Error while consulting Geocoding API',
        details: error.response.data.error_message
          ? error.response.data.error_message
          : null,
      });
    }
  }

  async getCoordinatesFromAddressZipCode(
    zipCode: string,
  ): Promise<{ lat: number; lng: number }> {
    try {
      const geocodingRequest = await axios.get(
        `${GEOCODING_URL}${zipCode}&key=${GOOGLE_GEOCODING_API_KEY}`,
      );

      let geocodingResponse: GeocodingResponse = geocodingRequest.data;

      if (
        !geocodingResponse.results.length ||
        geocodingResponse.status === 'ZERO_RESULTS'
      ) {
        throw new ValidationException({
          message: 'Geocoding API returned no results',
        });
      }

      if (geocodingResponse.status !== 'OK') {
        throw new ExternalRequestException({
          message: 'Geocoding API returned invalid response status',
        });
      }

      return geocodingResponse.results[0].geometry.location;
    } catch (error) {
      throw new ExternalRequestException({
        message: 'Error while consulting Geocoding API',
        details: error.response.data.error_message
          ? error.response.data.error_message
          : null,
      });
    }
  }
}

export default new Geocoding();
