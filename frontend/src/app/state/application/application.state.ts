import { Gender, PostParkingFilter, PostPetFilter, PostTypeFilter } from '@rmtd/common/enums';
import { Post, PostFilter } from '@rmtd/common/interfaces';

export interface ApplicationState {
  error: Error | null;
}

export const initialState: ApplicationState = {
  error: null,
};
