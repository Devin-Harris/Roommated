export enum Housing {
  Apartment = 'apartment',
  House = 'house',
}

export enum Parking {
  OnStreet = 'onstreet',
  Paid = 'paid',
  Garage = 'garage',
}

export type HousingType = `${Housing}`;

export type ParkingType = `${Parking}`;
