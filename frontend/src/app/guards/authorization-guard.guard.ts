import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, firstValueFrom, map, Observable, Subscription, take } from 'rxjs';
import { JWTTokenService } from '../services/jwt-token/jwt-token.service';
import { AuthenticationService } from '../state/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(JWTTokenService) private jwtService: JWTTokenService,
    @Inject(AuthenticationService) private authService: AuthenticationService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const token = this.authService.getAccessToken();
    const expired = token && this.jwtService.isTokenExpired(token);

    if (token) {
      if (expired) {
        // TODO: Show login to continue dialog prompt
        console.log('please resign in, your access_token is expired!');
        return false;
      } else {
        return true;
      }
    }

    // TODO: Show login to continue dialog prompt
    console.log("please resign in, you don't have an access_token!");
    return false;
  }
}
