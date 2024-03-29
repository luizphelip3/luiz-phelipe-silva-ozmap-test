import axios from 'axios';
import { ExternalRequestError, ValidationError } from '../../utils';
import {
  GEOCODING_REVERSE_URL,
  GEOCODING_URL,
  GOOGLE_GEOCODING_API_KEY,
} from '../../../../config/env/env-config';
import {
  GeocodingResponse,
  GeocodingResponseStatus,
} from './types/geo-lib.type';

class Geocoding {
  async getAddressFromCoordinates(coordinates: {
    lat: number;
    lng: number;
  }): Promise<string> {
    const geocodingRequest = await axios.request({
      method: 'GET',
      url: `${GEOCODING_REVERSE_URL}${coordinates.lat},${coordinates.lng}&key=${GOOGLE_GEOCODING_API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let geocodingResponse: GeocodingResponse = geocodingRequest.data;

    if (Object.values(GeocodingResponseStatus)[geocodingResponse.status] !== 'OK') {
      throw new ExternalRequestError({
        message: 'Resposta inválida da Geocoding API',
      });
    }

    if (!geocodingResponse.results.length) {
      throw new ValidationError({
        message: 'Nenhum endereço foi encontrado com as coordenadas informadas',
      });
    }

    return geocodingResponse.results[0].formatted_address;
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
        Object.values(GeocodingResponseStatus)[geocodingResponse.status] === 'ZERO_RESULTS'
      ) {
        throw new ValidationError({
          message:
            'Geocoding API returned no results',
        });
      }

      if (Object.values(GeocodingResponseStatus)[geocodingResponse.status] !== 'OK') {
        throw new ExternalRequestError({
          message: 'Geocoding API returned invalid request status',
        });
      }

      return geocodingResponse.results[0].geometry.location;
    } catch (error) {
      throw new ExternalRequestError({
        message: 'Error while consulting Geocoding API',
      });
    }
  }
}

export default new Geocoding();
