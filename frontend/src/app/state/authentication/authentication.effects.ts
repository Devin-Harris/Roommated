import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
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
}