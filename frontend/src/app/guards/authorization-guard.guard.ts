import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { JWTTokenService } from '../services/jwt-token/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(JWTTokenService) private jwtService: JWTTokenService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | boolean {
    if (this.jwtService.getUser()) {
      if (this.jwtService.isTokenExpired()) {
        this.router.navigateByUrl(`/signin?redirect_uri=${next.routeConfig?.path}`);
      } else {
        return true;
      }
    } else {
      return new Promise((resolve) => {
        // TODO: try to find user based on JWT Token and auto login as them
        // If that fails, take user to sign in page
        return EMPTY;
      });
    }

    return false;
  }
}
