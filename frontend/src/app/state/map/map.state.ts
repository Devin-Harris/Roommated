import { PostFilter } from '@rmtd/common/interfaces';

export interface MapState {
  filters: PostFilter;
}

export const initialState: MapState = {
  filters: {
    mapCenterLat: 47.599854,
    mapCenterLng: 3.533248,
    mapZoom: 13,
  },
};
