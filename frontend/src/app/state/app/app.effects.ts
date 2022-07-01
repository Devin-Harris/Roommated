import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ACCESS_TOKEN_LS_KEY } from '../authentication/authentication.service';
import * as AppActions from './app.actions';
import * as AuthenticationActions from './../authentication/authentication.actions';

@Injectable()
export class AppEffects {
  appLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appLoaded),
      switchMap((action): Observable<any> => {
        const access_token = this.localStorageService.get(ACCESS_TOKEN_LS_KEY);
        if (access_token) {
          return of(AuthenticationActions.reAuthenticate());
        }
        return EMPTY;
      })
    )
  );

  constructor(private actions$: Actions<any>, private localStorageService: LocalStorageService) {}
}
