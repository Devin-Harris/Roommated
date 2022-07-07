import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { PostFilter } from '@rmtd/common/interfaces';

export interface MapState {
  filters: PostFilter;
  filteredPosts: any[];
  error: Error | null;
}

export const initialState: MapState = {
  filters: {
    mapCenterLat: 47.599854,
    mapCenterLng: 3.533248,
    mapZoom: 13,
    type: [PostTypeFilter.Any],
    pets: [PostPetFilter.Any],
    parking: [PostParkingFilter.Any],
    gender: [Gender.Any],
  },
  filteredPosts: [],
  error: null,
};
