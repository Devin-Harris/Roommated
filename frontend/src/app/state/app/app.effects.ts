import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DialogRef } from 'src/app/components/dialogs/base/dialogRef';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
  ACCESS_TOKEN_LS_KEY,
  AuthenticationService,
} from '../authentication/authentication.service';
import * as AppActions from './app.actions';
import * as AuthenticationActions from './../authentication/authentication.actions';
import { ResponseAuthenticatedUserDto } from '@rmtd/common/dtos';

@Injectable()
export class AppEffects {
  appLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appLoaded),
      switchMap((action): Observable<any> => {
        const access_token = this.localStorageService.get(ACCESS_TOKEN_LS_KEY);
        if (access_token) {
          return this.authService.reAuthenticate().pipe(
            map((response: ResponseAuthenticatedUserDto) => {
              return AuthenticationActions.reAuthenticateSuccess(response);
            }),
            catchError((error: any) => {
              return of(AuthenticationActions.reAuthenticateFailure({ error }));
            })
          );
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions<any>,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) {}
}
