import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as AuthenticationReducer from './authentication/authentication.reducer';
import * as AppReducer from './app/app.reducer';
import * as GroupReducer from './group/group.reducer';

export const reducers: ActionReducerMap<State> = {
  app: AppReducer.reducer,
  authentication: AuthenticationReducer.reducer,
  group: GroupReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
