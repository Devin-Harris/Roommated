import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';

enum GroupTabs {
  Posts = 'Posts',
  Applications = 'Applications',
}

@Component({
  selector: 'my-group-page',
  templateUrl: './my-group-page.component.html',
  styleUrls: ['./my-group-page.component.scss'],
})
export class MyGroupPageComponent implements OnInit {
  mutatedGroup: any;

  groupInvitations: any[] = [];

  userIdsToRemove: number[] = [];

  selectedTab: string = GroupTabs.Posts;

  private currentGroup$: any;

  readonly groupTabs = GroupTabs;

  readonly genderOptions = Object.keys(Gender);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // TODO: make get request on page enter to get logged in users group
    // this.currentGroup$ = this.store.select(selectCurrentGroup).subscribe(group => {
    //   this.mutatedGroup = group
    // })
    this.mutatedGroup = {
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

  openInviteMemberDialog(): void {
    // TODO: create Invite group member dialog component and open it here
  }

  leaveGroup(): void {
    // TODO: dispatch action to remove group user entry and clear currentGroup state
  }

  saveGroup(): void {
    // TODO: dispatch action to save mutatedGroup over currentGroup
  }
}
