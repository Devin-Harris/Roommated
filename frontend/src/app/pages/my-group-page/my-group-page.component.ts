import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';

@Component({
  selector: 'my-group-page',
  templateUrl: './my-group-page.component.html',
  styleUrls: ['./my-group-page.component.scss'],
})
export class MyGroupPageComponent implements OnInit {
  currentGroup: any;

  groupInvitations: any[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // TODO: make get request on page enter to get logged in users group
    this.currentGroup = {
      createUserId: 1,
      updateUserId: 1,
      size: 1,
      name: 'Cool Group',
      showOnPosts: true,
      gender: Gender.Male,
      groupUsers: [
        {
          id: 1,
          firstname: 'Devin',
          lastname: 'Harris',
          profileImageUrl: null,
          groupUserRole: 'Owner',
        },
      ],
    };
  }
}
