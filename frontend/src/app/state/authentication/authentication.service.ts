import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CreateUserDto,
  CreateUsersDto,
  ResponseUserDto,
} from '@rmtd/common/dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  // TODO: put typing on loginBody param, interact with backend through http request, and put typing on returned observable
  login(loginBody: any): Observable<any> {
    return of(true);
    // return this.http.post<any>(`${environment.serverUrl}/api/login`, body: loginBody });
  }

  signup(
    createUserInfo: CreateUserDto,
    profileImage: File | undefined
  ): Observable<ResponseUserDto[]> {
    let body: CreateUsersDto = {
      items: [{ ...createUserInfo }],
    };

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
              body.items[0].profileImageUrl = profileImageUrl;
            }
            return this.http.post<any>(`${environment.serverUrl}/users`, body);
          })
        );
    }

    return this.http.post<any>(`${environment.serverUrl}/users`, body);
  }
}
