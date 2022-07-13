export enum Housing {
  Dorm = 'Dorm',
  Apartment = 'Apartment',
  House = 'House',
}

export enum Parking {
  OnStreet = 'On street',
  Paid = 'Paid',
  Garage = 'Garage',
}

export enum PostState {
  Searching = 'Searching',
  Filled = 'Filled',
}

export type HousingType = `${Housing}`;

export type ParkingType = `${Parking}`;

export type PostStateType = `${PostState}`;
