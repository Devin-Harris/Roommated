import { HousingType, ParkingType, PostStateType } from '../enums';
import { Group } from './Group';
import { Location } from './Location';

export interface Post {
  groupId: number;
  group?: Group;
  description: string;
  houseType: HousingType;
  leaseStart: string;
  leaseEnd: string;
  petsAllowed: boolean;
  parkingType: ParkingType;
  location: Location;
  rent: number;
  state: PostStateType;
}
