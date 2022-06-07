import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResponseUserDto } from '@rmtd/common/dtos';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions<any>,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      switchMap(
        (): Observable<any> =>
          this.authService.login(true).pipe(
            map((loggedIn: boolean) => {
              if (loggedIn) {
                return AuthenticationActions.loginSuccess();
              } else {
                return AuthenticationActions.loginFailure();
              }
            }),
            catchError((error: any) => of(AuthenticationActions.loginFailure()))
          )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.signup),
      switchMap(
        (action): Observable<any> =>
          this.authService.signup(action.createUserInfo, action.profileImage).pipe(
            map((users: ResponseUserDto[]) => {
              return AuthenticationActions.signupSuccess({ user: users[0] });
            }),
            catchError((error: any) => {
              return of(AuthenticationActions.signupFailure({ error }));
            })
          )
      )
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.signupSuccess),
      switchMap((action): Observable<any> => {
        // Go to map page
        this.router.navigateByUrl('/map');
        // Show dialog to tell the user to make a group before posting/applying

        return EMPTY;
      })
    )
  );

  signupFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.signupFailure),
      switchMap((action): Observable<any> => {
        // Show dialog displaying error
        console.log('toast', action);

        return EMPTY;
      })
    )
  );
}
