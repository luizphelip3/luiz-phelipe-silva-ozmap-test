import axios, { AxiosError } from 'axios';
import {
  GEOCODING_REVERSE_URL,
  GEOCODING_URL,
  GOOGLE_GEOCODING_API_KEY,
} from '../../../../config/env/env-config';
import { ExternalRequestError, ValidationError } from '../../utils';
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

      if (geocodingResponse.status !== 'OK') {
        throw new ExternalRequestError({
          message: 'Resposta inválida da Geocoding API',
        });
      }

      if (!geocodingResponse.results.length) {
        throw new ValidationError({
          message:
            'Nenhum endereço foi encontrado com as coordenadas informadas',
        });
      }

      return geocodingResponse.results[0].formatted_address;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ExternalRequestError({
          message: 'Error while consulting Geocoding API',
          details: error.response.data.error_message,
        });
      }

      throw new ExternalRequestError({
        message: 'Error while consulting Geocoding API',
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
        throw new ValidationError({
          message: 'Geocoding API returned no results',
        });
      }

      if (geocodingResponse.status !== 'OK') {
        throw new ExternalRequestError({
          message: 'Geocoding API returned invalid request status',
        });
      }

      return geocodingResponse.results[0].geometry.location;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ExternalRequestError({
          message: 'Error while consulting Geocoding API',
          details: error.response.data.error_message,
        });
      }

      throw new ExternalRequestError({
        message: 'Error while consulting Geocoding API',
      });
    }
  }
}

export default new Geocoding();
