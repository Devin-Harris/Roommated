import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable, of } from 'rxjs';
import { PostFilter, User } from '@rmtd/common/interfaces';
import { Gender } from '@rmtd/common/enums';
import { environment } from 'src/environments/environment';
import { UpdateUserDto } from '@rmtd/common/dtos';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.serverUrl}/users/${id}`);
  }

  updateMyProfile(payload: { updateUserInfo: User; profileImage?: File }): Observable<User> {
    let body: User = { ...payload.updateUserInfo };

    if (payload.profileImage) {
      const formData = new FormData();
      formData.append('file', payload.profileImage);
      return this.http
        .post(`${environment.serverUrl}/users/profileImage`, formData, {
          responseType: 'text',
        })
        .pipe(
          mergeMap((profileImageUrl) => {
            if (profileImageUrl) {
              body.profileImageUrl = profileImageUrl;
            }
            return this.http.put<User>(`${environment.serverUrl}/users/me`, body);
          })
        );
    }

    return this.http.put<User>(`${environment.serverUrl}/users/me`, body);
  }
}
