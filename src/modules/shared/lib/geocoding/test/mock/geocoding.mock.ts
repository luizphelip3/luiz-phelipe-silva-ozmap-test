export const mockGeocodingGetAddressFromCoordinates = {
  data: {
    results: [
      {
        formatted_address: 'New York, NY, USA',
      },
    ],
    status: 'OK',
  },
};

export const mockGeocodingGetAddressFromCoordinatesZeroResultsResponse = {
    data: {
      results: [],
      status: 'ZERO_RESULTS',
    },
  };

export const mockGeocodingGetAddressFromCoordinatesInvalidStatusResponse = {
  data: {
    status: 'INVALID_REQUEST',
  },
};

export const mockGeocodingFromAddressZipCode = {
    data: {
      results: [
        {
          geometry: {
            location: {
              lat: 40.7128,
              lng: -74.006,
            },
          },
        },
      ],
      status: 'OK',
    },
  };

  export const mockGeocodingFromAddressZipCodeZeroResultsResponse = {
    data: {
      results: [],
      status: 'ZERO_RESULTS',
    },
  };

  export const mockGeocodingFromAddressZipCodeInvalidStatusResponse = {
    data: {
      status: 'INVALID_REQUEST',
    },
  };
