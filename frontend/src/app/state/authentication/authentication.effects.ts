import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ResponseUserDto } from "@rmtd/common/dtos";
import { Observable, of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as AuthenticationActions from "./authentication.actions";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationEffects {
  constructor(private actions$: Actions<any>, private authService: AuthenticationService) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      switchMap((): Observable<any> =>
        this.authService.login(true).pipe(
          map((loggedIn: boolean) => {
            if (loggedIn) {
              return AuthenticationActions.loginSuccess()
            } else {
              return AuthenticationActions.loginFailure()
            }
          }),
          catchError((error: any) =>
            of(AuthenticationActions.loginFailure())
          )
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.signup),
      switchMap((action): Observable<any> => 
        this.authService.signup(action.createUserInfo).pipe(
          map((users: ResponseUserDto[]) => {
            return AuthenticationActions.signupSuccess({ user: users[0] })
          }),
          catchError((error: any) =>
            of(AuthenticationActions.signupFailure())
          )
        )
      )
    )
  );
}