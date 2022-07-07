import { AppState } from './app';
import { AuthenticationState } from './authentication';
import { GroupState } from './group';
import { MapState } from './map';

export interface State {
  app: AppState;
  authentication: AuthenticationState;
  group: GroupState;
  map: MapState;
}
