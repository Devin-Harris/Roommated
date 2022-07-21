import { createAction, props } from '@ngrx/store';

export const applyToPost = createAction(
  '[Application] apply to post',
  props<{ postId: number; message: string }>()
);
export const applyToPostSuccess = createAction('[Application] apply to post success');
export const applyToPostFailure = createAction(
  '[Application] apply to post failure',
  props<{ error: Error }>()
);
