interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface ILocation {
  lat: number;
  lng: number;
}

interface IViewport {
  northeast: ILocation;
  southwest: ILocation;
}

interface IGeometry {
  location: ILocation;
  location_type: string;
  viewport: IViewport;
}

interface IPlusCode {
  compound_code: string;
  global_code: string;
}

interface IResult {
  address_components: IAddressComponent[];
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  plus_code: IPlusCode;
  types: string[];
}

export type GeocodingResponse = {
  results: IResult[];
  status: GeocodingResponseStatus;
}

enum GeocodingResponseStatus {
  OK = 'OK',
  ZERO_RESULTS = 'ZERO_RESULTS',
  OVER_DAILY_LIMIT = 'OVER_DAILY_LIMIT',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
