import { AppState } from './app';
import { AuthenticationState } from './authentication';
import { GroupState } from './group';
import { MapState } from './map';
import { ProfileState } from './profile';

export interface State {
  app: AppState;
  authentication: AuthenticationState;
  group: GroupState;
  map: MapState;
  profile: ProfileState;
}
