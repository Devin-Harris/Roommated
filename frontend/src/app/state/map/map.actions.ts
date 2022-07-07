import { createAction, props } from '@ngrx/store';

export const storeMapFilters = createAction(
  '[Map] store map filters',
  props<{
    filters: any;
  }>()
);
