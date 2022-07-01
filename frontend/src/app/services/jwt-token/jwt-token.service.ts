import { Injectable } from '@angular/core';
import { AuthenticatedUser, User } from '@rmtd/common/interfaces';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  constructor() {}

  decodeToken(token: string): any {
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  getDecodeToken(token: string) {
    return jwt_decode(token);
  }

  getUser(token: string) {
    const decodedToken = this.decodeToken(token);
    return decodedToken
      ? {
          id: decodedToken['sub'],
          firstName: decodedToken['firstname'],
          lastName: decodedToken['lastname'],
          isAdmin: decodedToken['isAdmin'],
        }
      : null;
  }

  getExpiryTime(token: string) {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? parseInt(decodedToken['exp']) : null;
  }

  isTokenExpired(token: string): boolean {
    const expiryTime: number | null = this.getExpiryTime(token);
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 0;
    } else {
      return false;
    }
  }
}
