import { createAction, props } from '@ngrx/store';
import { Application} from '@rmtd/common/interfaces';

export const applyToPost = createAction(
  '[Application] apply to post',
  props<{ postId: number; message: string }>()
);
export const applyToPostSuccess = createAction('[Application] apply to post success');
export const applyToPostFailure = createAction(
  '[Application] apply to post failure',
  props<{ error: Error }>()
);

export const declineReceivedGroupApplicant = createAction(
  '[Received Group] decline received group applicant',
  props<{ applicant: Application }>()
);
export const declineReceivedGroupApplicantSuccess = createAction(
  '[Received Group] decline received group applicant success'
);
export const declineReceivedGroupApplicantFailure = createAction(
  '[Received Group] decline received group applicant failure',
  props<{ error: Error }>()
);

export const acceptReceivedGroupApplicant = createAction(
  '[Received Group] accept received group applicant',
  props<{ applicant: Application }>()
);
export const acceptReceivedGroupApplicantSuccess = createAction(
  '[Received Group] accept received group applicant success'
);
export const acceptReceivedGroupApplicantFailure = createAction(
  '[Received Group] accept received group applicant failure',
  props<{ error: Error }>()
);
