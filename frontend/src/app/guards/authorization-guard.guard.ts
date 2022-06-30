import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  Observable,
  skip,
  take,
} from 'rxjs';
import { DialogService } from '../components/dialogs/base/dialog.service';
import { DialogRef } from '../components/dialogs/base/dialogRef';
import { SignInDialogComponent } from '../components/dialogs/sign-in-dialog/sign-in-dialog.component';
import { JWTTokenService } from '../services/jwt-token/jwt-token.service';
import { selectIsLoggedIn, selectLoggingIn } from '../state/authentication';
import { AuthenticationService } from '../state/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
  private $loggingIn: Observable<boolean>;

  private loggingIn: boolean = false;

  private $loggedIn: Observable<boolean>;

  private loggedIn: boolean = false;

  constructor(
    private store: Store,
    private dialogService: DialogService
    @Inject(JWTTokenService) private jwtService: JWTTokenService,
    @Inject(AuthenticationService) private authService: AuthenticationService
  ) {
    this.$loggingIn = this.store.select(selectLoggingIn);
    this.$loggingIn.subscribe((loggingIn) => {
      this.loggingIn = loggingIn;
    });
    this.$loggedIn = this.store.select(selectIsLoggedIn);
    this.$loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getAccessToken();
    const expired = token && this.jwtService.isTokenExpired(token);

    const skipCount = this.loggingIn === false && this.loggedIn === false ? 2 : 1;

    if (token) {
      if (expired) {
        const dialogRef = this.openSignInDialog('Your access token is expired!');
        return combineLatest([dialogRef.afterClosed(), this.$loggingIn, this.$loggedIn]).pipe(
          map(([_, isLoggingIn, isLoggedIn]) => {
            return !isLoggingIn && isLoggedIn;
          }),
          skip(skipCount),
          take(1)
        );
      } else {
        return true;
      }
    } else {
      const dialogRef = this.openSignInDialog('You are not signed in!');
      return combineLatest([dialogRef.afterClosed(), this.$loggingIn, this.$loggedIn]).pipe(
        map(([_, isLoggingIn, isLoggedIn]) => {
          return !isLoggingIn && isLoggedIn;
        }),
        skip(skipCount),
        take(1)
      );
    }
  }

  private openSignInDialog(headerOverride: string): DialogRef {
    return this.dialogService.open(SignInDialogComponent, {
      data: { headerOverride },
    });
  }
}
