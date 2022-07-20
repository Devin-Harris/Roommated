import { Action, createReducer, on } from '@ngrx/store';
import { initialState, MapState } from './map.state';
import * as MapActions from './map.actions';

const mapReducer = createReducer(
  initialState,
  on(MapActions.storeMapFilters, (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      ...action.filters,
    },
  })),
  on(MapActions.getFilteredPostsSuccess, (state, action) => ({
    ...state,
    filteredPosts: action.posts,
    filters: {
      ...state.filters,
      sidebarPostOverrideId: undefined,
    },
  })),
  on(MapActions.getFilteredPostsFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export function reducer(state: MapState | undefined, action: Action) {
  return mapReducer(state, action);
}
