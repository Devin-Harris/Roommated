import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DialogRef } from 'src/app/components/dialogs/base/dialogRef';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import {
  ACCESS_TOKEN_LS_KEY,
  AuthenticationService,
} from '../authentication/authentication.service';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  appLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appLoaded),
      switchMap((action): Observable<any> => {
        const access_token = this.localStorageService.get(ACCESS_TOKEN_LS_KEY);
        if (access_token) {
          this.authService.setAccessToken(access_token);
          // TODO: Trigger sign in based on decoded token info
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
