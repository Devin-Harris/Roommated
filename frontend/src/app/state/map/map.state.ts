import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { Post, PostFilter } from '@rmtd/common/interfaces';

export interface MapState {
  filters: PostFilter;
  filteredPosts: Post[];
  error: Error | null;
}

export const initialState: MapState = {
  filters: {
    mapCenterLat: undefined,
    mapCenterLng: undefined,
    mapZoom: 13,
    housingTypes: [PostTypeFilter.Any],
    pets: [PostPetFilter.Any],
    parkings: [PostParkingFilter.Any],
    genders: [Gender.Any],
  },
  filteredPosts: [],
  error: null,
};
