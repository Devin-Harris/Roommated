import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '../enums';

export interface PostFilter {
  minPrice?: number;
  maxPrice?: number;
  minGroupSize?: number;
  maxGroupSize?: number;
  housingTypes?: PostTypeFilter[];
  moveInDate?: Date;
  pets?: PostPetFilter[];
  parkings?: PostParkingFilter[];
  genders?: Gender[];
  mapCenterLat?: number;
  mapCenterLng?: number;
  metersInView?: number;
  mapZoom?: number;
}
