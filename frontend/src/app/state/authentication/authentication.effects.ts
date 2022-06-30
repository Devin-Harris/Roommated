import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResponseAuthenticatedUserDto } from '@rmtd/common/dtos';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DialogService } from 'src/app/components/dialogs/base/dialog.service';
import { DialogRef } from 'src/app/components/dialogs/base/dialogRef';
import { CreateGroupDialogComponent } from 'src/app/components/dialogs/create-group-dialog/create-group-dialog.component';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.login),
      switchMap(
        (action): Observable<any> =>
          this.authService.login({ email: action.email, password: action.password }).pipe(
            map((response: ResponseAuthenticatedUserDto) => {
              return AuthenticationActions.loginSuccess({
                ...response,
                routeToMap: action.routeToMap,
              });
            }),
            catchError((error: any) => of(AuthenticationActions.loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loginSuccess),
      switchMap((action): Observable<any> => {
        this.authService.setAccessToken(action.access_token);
        if (action.routeToMap) {
          this.router.navigateByUrl('/map');
        }
        return EMPTY;
      })
    )
  );

  reauthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.reAuthenticateSuccess),
      switchMap((action): Observable<any> => {
        this.authService.setAccessToken(action.access_token);
        return EMPTY;
      })
    )
  );

  reAuthenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.reAuthenticate),
      switchMap((action): Observable<any> => {
        return this.authService.reAuthenticate().pipe(
          map((response: ResponseAuthenticatedUserDto) => {
            return AuthenticationActions.reAuthenticateSuccess({
              user: response.user,
              access_token: response.access_token,
            });
          }),
          catchError((error: any) => {
            return of(AuthenticationActions.reAuthenticateFailure({ error }));
          })
        );
      })
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.signup),
      switchMap(
        (action): Observable<any> =>
          this.authService.signup(action.createUserInfo, action.profileImage).pipe(
            map((response: ResponseAuthenticatedUserDto) => {
              return AuthenticationActions.signupSuccess({
                user: response.user,
                access_token: response.access_token,
              });
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
        this.authService.setAccessToken(action.access_token);
        this.router.navigateByUrl('/map');
        this.dialogRef = this.dialogService.open(CreateGroupDialogComponent);

        this.dialogRef.afterClosed().subscribe(() => {
          // Subscription runs after the dialog closes
        });

        return EMPTY;
      })
    )
  );

  signupFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.signupFailure),
      switchMap((action): Observable<any> => {
        this.dialogRef = this.dialogService.open(ErrorDialogComponent, {
          data: { errors: this.convertSignupErrorToErrorsArray(action.error) },
        });

        this.dialogRef.afterClosed().subscribe(() => {
          // Subscription runs after the dialog closes
        });

        return EMPTY;
      })
    )
  );

  private dialogRef: DialogRef | null = null;

  constructor(
    private actions$: Actions<any>,
    private authService: AuthenticationService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  private convertSignupErrorToErrorsArray(error: any): string[] {
    if (error.error) {
      const innerError = error.error;
      if (innerError.message instanceof Array) {
        return innerError.message;
      } else {
        if (typeof innerError === 'string') {
          try {
            const parsed = JSON.parse(innerError);
            return [parsed.message];
          } catch {}
        }
        return [innerError.message];
      }
    }

    if (error.message) {
      return [error.message];
    }

    return error;
  }
}
