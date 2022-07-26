import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicationService } from './application.service';
import { select, Store } from '@ngrx/store';
import * as ApplicationActions from './application.actions';
import { catchError, EMPTY, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { selectCurrentUserGroup } from '../group';
import { selectCurrentUser } from '../authentication';

@Injectable()
export class ApplicationEffects {
  applyToPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.applyToPost),
      withLatestFrom(
        this.store$.pipe(select(selectCurrentUserGroup)),
        this.store$.pipe(select(selectCurrentUser))
      ),
      switchMap(([action, currentUserGroup, currentUser]): Observable<any> => {
        if (!currentUserGroup || currentUserGroup.id === undefined || !currentUser) {
          return EMPTY;
        }

        return this.applicationService.applyToPost(action.postId, action.message).pipe(
          map(() => {
            return ApplicationActions.applyToPostSuccess();
          }),
          catchError((error: any) => {
            return of(ApplicationActions.applyToPostFailure({ error }));
          })
        );
      })
    )
  );

  declineApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.declineReceivedGroupApplicant),
      withLatestFrom(
        this.store$.pipe(select(selectCurrentUserGroup)),
        this.store$.pipe(select(selectCurrentUser))
      ),
      switchMap(([action, currentUserGroup, currentUser]): Observable<any> => {
        if (!currentUserGroup || currentUserGroup.id === undefined || !currentUser) {
          return EMPTY;
        }
        return this.applicationService.declineApplication(action.applicant).pipe(
          map(() => {
            return ApplicationActions.declineReceivedGroupApplicantSuccess();
          }),
          catchError((error: any) => {
            return of(ApplicationActions.declineReceivedGroupApplicantFailure({error}));
          })
        );
      })
    )
  );

  acceptApplication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationActions.acceptReceivedGroupApplicant),
      withLatestFrom(
        this.store$.pipe(select(selectCurrentUserGroup)),
        this.store$.pipe(select(selectCurrentUser))
      ),
      switchMap(([action, currentUserGroup, currentUser]): Observable<any> => {
        if (!currentUserGroup || currentUserGroup.id === undefined || !currentUser) {
          return EMPTY;
        }
        return this.applicationService.acceptApplication(action.applicant).pipe(
          map(() => {
            return ApplicationActions.acceptReceivedGroupApplicantSuccess();
          }),
          catchError((error: any) => {
            return of(ApplicationActions.acceptReceivedGroupApplicantFailure({error}));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private applicationService: ApplicationService
  ) {}
}
