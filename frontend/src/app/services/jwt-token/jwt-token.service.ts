import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  jwtToken!: string;

  decodedToken!: { [key: string]: any };

  constructor() {}

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken
      ? {
          id: this.decodedToken['sub'],
          firstName: this.decodedToken['firstname'],
          lastName: this.decodedToken['lastname'],
          isAdmin: this.decodedToken['isAdmin'],
        }
      : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? parseInt(this.decodedToken['exp']) : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 0;
    } else {
      return false;
    }
  }
}
