import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';
import { User } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/components/dialogs/base/dialog.service';
import { InviteGroupMemberDialogComponent } from 'src/app/components/dialogs/invite-group-member-dialog/invite-group-member-dialog.component';
import { LeaveGroupConfirmationDialogComponent } from 'src/app/components/dialogs/leave-group-confirmation-dialog/leave-group-confirmation-dialog.component';
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

  // TODO: use GroupInvitation type instead of any
  groupInvitations: any[] = [
    {
      groupId: 2,
      groupName: 'Cool group',
      createDate: new Date('6/10/2022'),
      state: 'Pending',
    },
  ];

  selectedTab: string = GroupTabs.Posts;

  hasGroupChanges = false;

  private userIdsToRemove: number[] = [];

  private userIdsToPromote: number[] = [];

  private userIdsToDemote: number[] = [];

  private currentUser$: Observable<User | null>;

  private currentUser: User | null = null;

  private currentGroup$: any;

  // TODO: use GroupInvitation type instead of any
  private currentUserGroupInvitations$: Observable<any | null>;

  readonly groupTabs = GroupTabs;

  readonly genderOptions = Object.keys(Gender);

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private dialogService: DialogService, private router: Router) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    // TODO: make get request on page enter to get logged in users group invitations
    this.currentUserGroupInvitations$ = this.store.select(selectCurrentUserGroupInvitations);
    this.currentUserGroupInvitations$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((currentUserGroupInvitations) => {
        this.groupInvitations = currentUserGroupInvitations;
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
        {
          id: 2,
          firstname: 'Sonic',
          lastname: 'Hedgehog',
          profileImageUrl: undefined,
          groupUserRole: 'Admin',
        },
        {
          id: 2,
          firstname: 'Daffy',
          lastname: 'Duck',
          profileImageUrl: undefined,
          groupUserRole: 'Member',
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  openInviteMemberDialog(): void {
    this.dialogService.open(InviteGroupMemberDialogComponent);
  }

  leaveGroup(): void {
    this.dialogService.open(LeaveGroupConfirmationDialogComponent);
  }

  setOnGroupChanges(): void {
    this.hasGroupChanges = true;
  }

  saveGroup(): void {
    // TODO: dispatch action to save mutatedGroup over currentGroup
    // Also remove all users in userIdsToRemove, promote users in userIdsToPromote, and demote users in userIdsToDemote
  }

  canLoggedInUserEdit(): boolean {
    if (!this.currentUser) return false;

    const groupUser = this.getLoggedInGroupUser();
    if (!groupUser) return false;

    // TODO: use GroupUserRole enum instead of string
    return groupUser.groupUserRole === 'Owner' || groupUser.groupUserRole === 'Admin';
  }

  handleRemoveClick(groupUser: any): void {
    this.setOnGroupChanges();
    if (!this.userIdsToRemove.find((userId) => userId === groupUser.id)) {
      this.userIdsToRemove.push(groupUser.id);
    }
  }

  handlePromoteClick(groupUser: any): void {
    this.setOnGroupChanges();
    if (!this.userIdsToDemote.find((userId) => userId === groupUser.id)) {
      this.userIdsToDemote = this.userIdsToDemote.filter((userId) => userId !== groupUser.id);
    } else if (!this.userIdsToPromote.find((userId) => userId === groupUser.id)) {
      this.userIdsToPromote.push(groupUser.id);
    }
  }

  handleDemoteClick(groupUser: any): void {
    this.setOnGroupChanges();
    if (!this.userIdsToPromote.find((userId) => userId === groupUser.id)) {
      this.userIdsToPromote = this.userIdsToPromote.filter((userId) => userId !== groupUser.id);
    } else if (!this.userIdsToDemote.find((userId) => userId === groupUser.id)) {
      this.userIdsToDemote.push(groupUser.id);
    }
  }

  // TODO: use GroupUser interface instead of any
  getLoggedInGroupUser(): any {
    return this.mutatedGroup.groupUsers.find((user: any) => {
      return user.id === this.currentUser!.id;
    });
  }

  deleteGroupInvitation(invitation: any): void {
    // TODO: dispatch action to remove group invitation
  }

  viewGroupInvitation(invitation: any): void {
    this.router.navigateByUrl(`/group/${invitation.groupId}`);
  }

  acceptGroupInvitation(invitation: any): void {
    this.dialogService.open(LeaveGroupConfirmationDialogComponent, {
      data: { groupToJoinId: invitation.groupId },
    });
  }
}
