import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { PostFilter, User } from '@rmtd/common/interfaces';

export interface ProfileState {
  userProfile: User | null;
}

export const initialState: ProfileState = {
  userProfile: null,
};
