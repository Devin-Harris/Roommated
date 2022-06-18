import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group, User } from '@rmtd/common/interfaces';
import {
  ResponseGroupDto,
  ResponseGroupInvitationDto,
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
    return this.http.get<ResponseGroupDto>(`${environment.serverUrl}/groups/user/${user.id}`);
  }

  saveGroup(data: UpdateGroupPayloadDto): Observable<ResponseGroupDto> {
    return this.http.put<ResponseGroupDto>(
      `${environment.serverUrl}/groups/${data.mutatedGroup.id}`,
      {
        ...data,
      }
    );
  }

  leaveGroup(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}/groupusers/${userId}`);
  }
}
