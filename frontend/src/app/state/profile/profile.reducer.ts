import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';

const mapReducer = createReducer(
  initialState,
  on(ProfileActions.profilePageLoaded, (state, action) => ({
    ...state,
  })),
  on(ProfileActions.profilePageLoadedSuccess, (state, action) => ({
    ...state,
    userProfile: action.user,
  }))
);

export function reducer(state: ProfileState | undefined, action: Action) {
  return mapReducer(state, action);
}
