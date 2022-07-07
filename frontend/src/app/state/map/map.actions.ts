import { createAction, props } from '@ngrx/store';
import { PostFilter } from '@rmtd/common/interfaces';

export const storeMapFilters = createAction(
  '[Map] store map filters',
  props<{
    filters: PostFilter;
  }>()
);
