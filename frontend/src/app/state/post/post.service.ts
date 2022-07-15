import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group, GroupInvitation, Post, User } from '@rmtd/common/interfaces';
import {
  CreatePostDto,
  ResponseGroupDto,
  ResponseGroupInvitationDto,
  ResponseUserDto,
  UpdateGroupDto,
  UpdateGroupPayloadDto,
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
    return this.http.post<Post>(`${environment.serverUrl}/post`, data);
  }

  getMePost() {
    return this.http.get<Post>(`${environment.serverUrl}/post/me`);
  }
}
