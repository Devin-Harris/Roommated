import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CreateUserDto,
  CreateUsersDto,
  ResponseAuthenticatedUserDto,
  ResponseUserDto,
} from '@rmtd/common/dtos';
import { AuthenticatedUser } from '@rmtd/common/interfaces';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { JWTTokenService } from 'src/app/services/jwt-token/jwt-token.service';

export const ACCESS_TOKEN_LS_KEY = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService
  ) {}

  // TODO: put typing on loginBody param, interact with backend through http request, and put typing on returned observable
  login(loginBody: any): Observable<any> {
    return of(true);
    // return this.http.post<any>(`${environment.serverUrl}/api/login`, body: loginBody });
  }

  signup(
    createUserInfo: CreateUserDto,
    profileImage: File | undefined
  ): Observable<ResponseAuthenticatedUserDto> {
    let body: CreateUserDto = { ...createUserInfo };

    if (profileImage) {
      const formData = new FormData();
      formData.append('file', profileImage);
      return this.http
        .post(`${environment.serverUrl}/users/profileImage`, formData, {
          responseType: 'text',
        })
        .pipe(
          mergeMap((profileImageUrl) => {
            if (profileImageUrl) {
              body.profileImageUrl = profileImageUrl;
            }
            return this.http.post<any>(`${environment.serverUrl}/users`, body);
          })
        );
    }

    return this.http.post<any>(`${environment.serverUrl}/users`, body);
  }

  setAccessToken(access_token: string): void {
    this.localStorageService.set(ACCESS_TOKEN_LS_KEY, access_token);
    this.jwtTokenService.setToken(access_token);
  }

  getAccessToken(): string | null {
    return this.localStorageService.get(ACCESS_TOKEN_LS_KEY);
  }
}
