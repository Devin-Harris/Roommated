import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as AuthenticationReducer from './authentication/authentication.reducer';
import * as AppReducer from './app/app.reducer';
import * as GroupReducer from './group/group.reducer';
import * as MapReducer from './map/map.reducer';
import * as ProfileReducer from './profile/profile.reducer';

export const reducers: ActionReducerMap<State> = {
  app: AppReducer.reducer,
  authentication: AuthenticationReducer.reducer,
  group: GroupReducer.reducer,
  map: MapReducer.reducer,
  profile: ProfileReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
