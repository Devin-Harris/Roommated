import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';
import { User } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCurrentUser } from 'src/app/state/authentication';

enum GroupTabs {
  Posts = 'Posts',
  Applications = 'Applications',
}

@Component({
  selector: 'my-group-page',
  templateUrl: './my-group-page.component.html',
  styleUrls: ['./my-group-page.component.scss'],
})
export class MyGroupPageComponent implements OnInit, OnDestroy {
  mutatedGroup: any;

  groupInvitations: any[] = [];

  userIdsToRemove: number[] = [];

  selectedTab: string = GroupTabs.Posts;

  private currentUser$: Observable<User | null>;

  private currentUser: User | null = null;

  private currentGroup$: any;

  readonly groupTabs = GroupTabs;

  readonly genderOptions = Object.keys(Gender);

  private destroyed$ = new Subject<void>();

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    // TODO: make get request on page enter to get logged in users group
    // this.currentGroup$ = this.store.select(selectCurrentGroup).subscribe(group => {
    //   this.mutatedGroup = group
    // })
  }

  ngOnInit(): void {
    this.currentUser = {
      id: 1,
      firstname: 'Devin',
      lastname: 'Harris',
      profileImageUrl: undefined,
    };

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
          profileImageUrl: undefined,
          groupUserRole: 'Owner',
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
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

  canLoggedInUserEdit(): boolean {
    if (!this.currentUser) return false;

    // TODO: use GroupUser interface instead of any
    const groupUser = this.mutatedGroup.groupUsers.find((user: any) => {
      return user.id === this.currentUser!.id;
    });
    if (!groupUser) return false;

    // TODO: use GroupUserRole enum instead of string
    return groupUser.groupUserRole === 'Owner' || groupUser.groupUserRole === 'Admin';
  }
}
