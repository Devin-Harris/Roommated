import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as AuthenticationReducer from "./authentication/authentication.reducer";
import * as AppReducer from "./app/app.reducer";

export const reducers: ActionReducerMap<State> = {
  app: AppReducer.reducer,
  authentication: AuthenticationReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];