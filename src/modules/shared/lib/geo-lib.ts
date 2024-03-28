class GeoLib {
  public async getAddressFromCoordinates(
    coordinates: [number, number] | { lat: number; lng: number },
  ): Promise<string> {
    return 'address';
  }

  public async getCoordinatesFromAddress(
    address: string,
  ): Promise<{ lat: number; lng: number }> {
    return { lat: 123, lng: 456 };
  }
}

export default new GeoLib();
