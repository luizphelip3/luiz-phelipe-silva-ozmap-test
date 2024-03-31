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
    const geocodingRequest = await axios.get(
      `${GEOCODING_REVERSE_URL}${coordinates.lat},${coordinates.lng}&key=${GOOGLE_GEOCODING_API_KEY}`,
    );

    let geocodingResponse: GeocodingResponse = geocodingRequest.data;

    if (geocodingResponse.status === 'ZERO_RESULTS') {
      throw new ValidationException({
        message: 'Geocoding API returned no results',
      });
    }

    if (geocodingResponse.status !== 'OK') {
      throw new ExternalRequestException({
        message: 'Geocoding API returned invalid response status',
        details: { status: geocodingResponse.status },
      });
    }

    return geocodingResponse.results[0].formatted_address;
  }

  async getCoordinatesFromAddressZipCode(
    zipCode: string,
  ): Promise<{ lat: number; lng: number }> {
    const geocodingRequest = await axios.get(
      `${GEOCODING_URL}${zipCode}&key=${GOOGLE_GEOCODING_API_KEY}`,
    );

    let geocodingResponse: GeocodingResponse = geocodingRequest.data;

    if (geocodingResponse.status === 'ZERO_RESULTS') {
      throw new ValidationException({
        message: 'Geocoding API returned no results',
      });
    }

    if (geocodingResponse.status !== 'OK') {
      throw new ExternalRequestException({
        message: 'Geocoding API returned invalid response status',
        details: { status: geocodingResponse.status },
      });
    }

    return geocodingResponse.results[0]?.geometry?.location;
  }
}

export default new Geocoding();
