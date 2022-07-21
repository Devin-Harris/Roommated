import { Action, createReducer, on } from '@ngrx/store';
import { initialState, ApplicationState } from './application.state';
import * as ApplicationActions from './application.actions';

const mapReducer = createReducer(
  initialState,
  on(ApplicationActions.applyToPost, ApplicationActions.applyToPostSuccess, (state, action) => ({
    ...state,
  })),
  on(ApplicationActions.applyToPostFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export function reducer(state: ApplicationState | undefined, action: Action) {
  return mapReducer(state, action);
}
