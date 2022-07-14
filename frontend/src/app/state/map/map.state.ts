import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { Post, PostFilter } from '@rmtd/common/interfaces';

export interface MapState {
  filters: PostFilter;
  filteredPosts: Post[];
  error: Error | null;
}

export const initialState: MapState = {
  filters: {
    mapCenterLat: 47.599854,
    mapCenterLng: 3.533248,
    mapZoom: 13,
    housingTypes: [PostTypeFilter.Any],
    pets: [PostPetFilter.Any],
    parkings: [PostParkingFilter.Any],
    genders: [Gender.Any],
  },
  filteredPosts: [],
  error: null,
};
