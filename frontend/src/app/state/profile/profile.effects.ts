import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from './profile.service';
import { Store } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { catchError, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { User } from '@rmtd/common/interfaces';

@Injectable()
export class ProfileEffects {
  profilePageLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.profilePageLoaded),
      switchMap((action: any): Observable<any> => {
        const id = action.id;

        if (id === null || id === undefined) {
          return EMPTY;
        }

        return this.profileService.getProfileById(id).pipe(
          map((user: User) => {
            if (user === null) {
              return EMPTY;
            }
            return ProfileActions.profilePageLoadedSuccess({ user });
          }),
          catchError((error: any) => {
            return of(ProfileActions.profilePageLoadedFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions<any>,
    private store$: Store,
    private profileService: ProfileService
  ) {}
}
