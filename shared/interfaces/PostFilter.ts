import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '../enums';

export interface PostFilter {
  minPrice?: number;
  maxPrice?: number;
  minGroupSize?: number;
  maxGroupSize?: number;
  type?: PostTypeFilter[];
  moveInDate?: Date;
  pets?: PostPetFilter[];
  parking?: PostParkingFilter[];
  gender?: Gender[];
  mapCenterLat?: number;
  mapCenterLng?: number;
  mapZoom?: number;
}
