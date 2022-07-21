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

  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private applicationService: ApplicationService
  ) {}
}
