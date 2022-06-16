import { AppState } from './app';
import { AuthenticationState } from './authentication';
import { GroupState } from './group';

export interface State {
  app: AppState;
  authentication: AuthenticationState;
  group: GroupState;
}
