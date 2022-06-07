import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResponseUserDto } from '@rmtd/common/dtos';
import { EMPTY, Observable, of, withLatestFrom } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DialogService } from 'src/app/components/dialogs/base/dialog.service';
import { DialogRef } from 'src/app/components/dialogs/base/dialogRef';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';
import * as AuthenticationActions from './authentication.actions';
import { selectAuthErrors } from './authentication.selector';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationEffects {
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
