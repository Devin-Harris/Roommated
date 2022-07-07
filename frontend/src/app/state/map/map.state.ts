import { Group, GroupInvitation, User } from '@rmtd/common/interfaces';

export interface MapState {
  filters: any;
}

export const initialState: MapState = {
  filters: null,
};
