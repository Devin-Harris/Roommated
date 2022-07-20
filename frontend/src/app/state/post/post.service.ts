import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group, GroupInvitation, Post, User } from '@rmtd/common/interfaces';
import {
  CreatePostDto,
  ResponseGroupDto,
  ResponseGroupInvitationDto,
  ResponsePostDto,
  ResponseUserDto,
  UpdateGroupDto,
  UpdateGroupPayloadDto,
  UpdatePostDto,
} from '@rmtd/common/dtos';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getCurrentUserInvitations(user: User): Observable<ResponseGroupInvitationDto[]> {
    return this.http.get<ResponseGroupInvitationDto[]>(
      `${environment.serverUrl}/groupinvitations/user/${user.id}`
    );
  }

  createPost(data: CreatePostDto) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key == 'location') {
        for (let [locationKey, locationVal] of Object.entries(data.location)) {
          formData.append(`location[${locationKey}]`, locationVal);
        }
      } else if (key == 'attachments') {
        for (let file of data.attachments) {
          formData.append('attachments', file);
        }
      } else {
        formData.append(key, value);
      }
    }
    return this.http.post<Post>(`${environment.serverUrl}/post`, formData);
  }

  updatePost(data: UpdatePostDto) {
    return this.http.put<ResponsePostDto>(`${environment.serverUrl}/post/me`, data);
  }

  getMePost() {
    return this.http.get<ResponsePostDto>(`${environment.serverUrl}/post/me`);
  }
}
