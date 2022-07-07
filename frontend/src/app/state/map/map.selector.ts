import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.state';

export const selectMap = createFeatureSelector<MapState>('map');

export const selectMapFilters = createSelector(selectMap, (state: MapState) => state.filters);

export const selectFilteredMapPosts = createSelector(
  selectMap,
  (state: MapState) => state.filteredPosts
);
