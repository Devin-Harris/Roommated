import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Group, User } from '@rmtd/common/interfaces';
import { ResponseGroupDto, UpdateGroupDto } from '@rmtd/common/dtos';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getCurrentUserInvitations(user: User): Observable<any> {
    return of([
      {
        groupId: 2,
        groupName: 'Cool group',
        createDate: new Date('6/10/2022'),
        state: 'Pending',
      },
    ]);

    // TODO: Make request to get all currentUser invitations
    return this.http.get(`${environment.serverUrl}/group-invitations?userId=${user.id}`);
  }

  getCurrentUserGroup(user: User): Observable<ResponseGroupDto> {
    return this.http.get<ResponseGroupDto>(`${environment.serverUrl}/groups/user/${user.id}`);
  }

  saveGroup(data: {
    mutatedGroup: UpdateGroupDto;
    userIdsToRemove: number[];
    userIdsToPromote: number[];
    userIdsToDemote: number[];
  }): Observable<ResponseGroupDto> {
    return this.http.put<ResponseGroupDto>(
      `${environment.serverUrl}/groups/${data.mutatedGroup.id}`,
      {
        ...data,
      }
    );
  }
}
