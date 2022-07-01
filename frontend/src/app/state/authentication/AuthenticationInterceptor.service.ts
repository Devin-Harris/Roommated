import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getAccessToken();
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(req);
  }
}
