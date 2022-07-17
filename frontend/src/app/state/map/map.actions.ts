import { createAction, props } from '@ngrx/store';
import { Post, PostFilter } from '@rmtd/common/interfaces';

export const storeMapFilters = createAction(
  '[Map] store map filters',
  props<{
    filters: PostFilter;
  }>()
);

export const getFilteredPostsSuccess = createAction(
  '[Map] get filtered posts success',
  props<{
    posts: any[];
  }>()
);

export const getFilteredPostsFailure = createAction(
  '[Map] get filtered posts failure',
  props<{ error: Error }>()
);
