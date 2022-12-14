import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group, GroupInvitation, User } from '@rmtd/common/interfaces';
import {
  ResponseGroupDto,
  ResponseGroupInvitationDto,
  ResponseUserDto,
  UpdateGroupDto,
  UpdateGroupPayloadDto,
} from '@rmtd/common/dtos';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getCurrentUserInvitations(user: User): Observable<ResponseGroupInvitationDto[]> {
    return this.http.get<ResponseGroupInvitationDto[]>(
      `${environment.serverUrl}/groupinvitations/user/${user.id}`
    );
  }

  getCurrentUserGroup(user: User): Observable<ResponseGroupDto> {
    return this.http.get<ResponseGroupDto>(`${environment.serverUrl}/groups/me`);
  }

  getGroupById(id: number): Observable<ResponseGroupDto> {
    return this.http.get<ResponseGroupDto>(`${environment.serverUrl}/groups/${id}`);
  }

  createGroup(group: Group): Observable<ResponseGroupDto> {
    return this.http.post<ResponseGroupDto>(`${environment.serverUrl}/groups/me`, {
      ...group,
    });
  }

  deleteMyGroup(): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}/groups/me`);
  }

  saveGroup(data: UpdateGroupPayloadDto): Observable<ResponseGroupDto> {
    return this.http.put<ResponseGroupDto>(`${environment.serverUrl}/groups/me`, {
      ...data,
    });
  }

  leaveGroup(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}/groupusers/${userId}`);
  }

  getGrouplessUsers(searchText: string): Observable<ResponseUserDto[]> {
    return this.http.post<ResponseUserDto[]>(`${environment.serverUrl}/users/groupless`, {
      searchText,
    });
  }

  sendGroupInvitations(users: User[], groupId: number): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/groupinvitations`, {
      users,
      groupId,
    });
  }

  declineGroupInvitation(invitation: GroupInvitation): Observable<void> {
    return this.http.put<void>(
      `${environment.serverUrl}/groupinvitations/${invitation.id}/decline`,
      null
    );
  }

  acceptGroupInvitation(
    invitation: GroupInvitation,
    group: Group | null,
    user: User
  ): Observable<void> {
    return this.http.put<void>(
      `${environment.serverUrl}/groupinvitations/${invitation.id}/accept`,
      {
        group,
        user,
      }
    );
  }

  applyToPost(postId: number, comment: string): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/applications`, {
      postId,
      comment,
    });
  }
}
