interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
}

export interface GeocodingResponse {
  results: Result[];
  status: GeocodingResponseStatus;
}

export enum GeocodingResponseStatus {
  OK = 'OK',
  ZERO_RESULTS = 'ZERO_RESULTS',
  OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
