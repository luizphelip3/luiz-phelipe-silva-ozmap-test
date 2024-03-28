import { Address } from '../types/address.type';

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city}, ${address.state}, ${address.zip_code}`;
}
