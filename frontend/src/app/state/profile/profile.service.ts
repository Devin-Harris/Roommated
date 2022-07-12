import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PostFilter, User } from '@rmtd/common/interfaces';
import { Gender } from '@rmtd/common/enums';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfileById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.serverUrl}/users/${id}`);
  }
}
