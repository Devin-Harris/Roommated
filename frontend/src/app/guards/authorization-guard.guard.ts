import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, merge, Observable, skip, take } from 'rxjs';
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
    private router: Router,
    private store: Store,
    private dialogService: DialogService,
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

    if (token) {
      if (expired) {
        const dialogRef = this.openSignInDialog('Your access token is expired!');
        return dialogRef.afterClosed().pipe(
          map(() => {
            return !this.loggingIn && this.loggedIn;
          })
        );
      } else {
        return true;
      }
    } else {
      const dialogRef = this.openSignInDialog('You are not signed in!');
      return merge(dialogRef.afterClosed(), this.$loggingIn).pipe(
        map(() => {
          if (!this.loggedIn) {
            this.router.navigateByUrl(`/signin?redirect_uri=${next.routeConfig?.path}`);
            dialogRef.close();
          }
          return !this.loggingIn && this.loggedIn;
        })
      );
    }
  }

  private openSignInDialog(headerOverride: string): DialogRef {
    return this.dialogService.open(SignInDialogComponent, {
      data: { headerOverride },
    });
  }
}
