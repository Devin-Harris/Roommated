import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@rmtd/common/interfaces';

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

  getCurrentUserGroup(user: User): Observable<any> {
    return of({
      createUserId: 1,
      updateUserId: 1,
      size: 1,
      name: 'Cool Group',
      showOnPosts: true,
      gender: 'Male',
      groupUsers: [
        {
          id: 1,
          firstname: 'Devin',
          lastname: 'Harris',
          profileImageUrl: undefined,
          groupUserRole: 'Owner',
        },
        {
          id: 2,
          firstname: 'Sonic',
          lastname: 'Hedgehog',
          profileImageUrl: undefined,
          groupUserRole: 'Admin',
        },
        {
          id: 3,
          firstname: 'Daffy',
          lastname: 'Duck',
          profileImageUrl: undefined,
          groupUserRole: 'Member',
        },
      ],
    });

    // TODO: Make request to get currentUsers group
    return this.http.get(`${environment.serverUrl}/groups?userId=${user.id}`);
  }
}
