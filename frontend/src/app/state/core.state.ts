import { AppState } from "./app";
import { AuthenticationState } from "./authentication";

export interface State {
  app: AppState,
  authentication: AuthenticationState
}