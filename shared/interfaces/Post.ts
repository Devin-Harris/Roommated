import { Location } from './Location';

export interface Post {
  groupId: string;
  description: string;
  houseType: 'house' | 'apartment';
  leaseStart: string;
  leaseEnd: string;
  petsAllowed: boolean;
  parkingType: 'onstreet' | 'paid' | 'garage';
  location: Location;
}
