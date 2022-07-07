import { Action, createReducer, on } from '@ngrx/store';
import { initialState, MapState } from './map.state';
import * as MapActions from './map.actions';

const mapReducer = createReducer(
  initialState,
  on(MapActions.storeMapFilters, (state, action) => ({
    ...state,
    mapFilters: action.filters,
  }))
);

export function reducer(state: MapState | undefined, action: Action) {
  return mapReducer(state, action);
}
