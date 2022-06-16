import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GroupService } from './group.service';
import * as GroupActions from './group.actions';
import { catchError, EMPTY, map, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectCurrentUser } from '../authentication';
import { select, Store } from '@ngrx/store';

@Injectable()
export class GroupEffects {
  pageLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.myGroupPageLoaded),
      switchMap((): Observable<any> => {
        console.log('My group page loaded');
        return EMPTY;
      })
    )
  );

  getCurrentUserGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.myGroupPageLoaded.type, GroupActions.getMyGroup.type),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser) {
          return EMPTY;
        }
        return this.groupService.getCurrentUserGroup(currentUser).pipe(
          map((group: any) => {
            return GroupActions.getMyGroupSuccess({ group });
          }),
          catchError((error: any) => {
            return of(GroupActions.getMyGroupFailure({ error }));
          })
        );
      })
    )
  );

  getCurrentUserInvitations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupActions.myGroupPageLoaded, GroupActions.getMyGroupInvitations),
      withLatestFrom(this.store$.pipe(select(selectCurrentUser))),
      switchMap(([action, currentUser]: any): Observable<any> => {
        if (!currentUser) {
          return EMPTY;
        }
        return this.groupService.getCurrentUserInvitations(currentUser).pipe(
          map((invitations: any[]) => {
            return GroupActions.getMyGroupInvitationsSuccess({ invitations });
          }),
          catchError((error: any) => {
            return of(GroupActions.getMyGroupInvitationsFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private groupService: GroupService
  ) {}
}
