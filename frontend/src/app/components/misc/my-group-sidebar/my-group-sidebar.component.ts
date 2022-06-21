import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Gender, GroupInvitationState, GroupUserRole } from '@rmtd/common/enums';
import { Group, GroupInvitation, GroupUser, User } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCurrentUser } from 'src/app/state/authentication';
import {
  declineGroupInvitation,
  saveGroup,
  selectCurrentUserGroup,
  selectCurrentUserGroupInvitations,
} from 'src/app/state/group';
import { DialogService } from '../../dialogs/base/dialog.service';
import { InviteGroupMemberDialogComponent } from '../../dialogs/invite-group-member-dialog/invite-group-member-dialog.component';
import { LeaveGroupConfirmationDialogComponent } from '../../dialogs/leave-group-confirmation-dialog/leave-group-confirmation-dialog.component';

@Component({
  selector: 'my-group-sidebar',
  templateUrl: './my-group-sidebar.component.html',
  styleUrls: ['./my-group-sidebar.component.scss'],
})
export class MyGroupSidebarComponent implements OnDestroy {
  mutatedGroup: Group | null = null;

  myPendingGroupInvitations: GroupInvitation[] | null = null;

  groupPendingInvitations: GroupInvitation[] = [];

  hasGroupChanges = false;

  showingCreateGroupForm = false;

  private userIdsToRemove: number[] = [];

  private userIdsToPromote: number[] = [];

  private userIdsToDemote: number[] = [];

  private invitationIdsToRemove: number[] = [];

  private currentUser$: Observable<User | null>;

  private currentUser: User | null = null;

  private currentGroup$: any;

  private currentGroup: any | null = null;

  // TODO: use GroupInvitation type instead of any
  private currentUserGroupInvitations$: any;

  readonly genderOptions = Object.keys(Gender);

  readonly invitationStateOptions = Object.keys(GroupInvitationState);

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private dialogService: DialogService, private router: Router) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    this.currentUserGroupInvitations$ = this.store.select(selectCurrentUserGroupInvitations);
    this.currentUserGroupInvitations$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((currentUserGroupInvitations: GroupInvitation[]) => {
        this.myPendingGroupInvitations = [...currentUserGroupInvitations].filter((invitation) => {
          return invitation.state === GroupInvitationState.Pending;
        });
      });

    this.currentGroup$ = this.store.select(selectCurrentUserGroup);
    this.currentGroup$.pipe(takeUntil(this.destroyed$)).subscribe((group: any) => {
      this.currentGroup = group;
      if (this.currentGroup) {
        this.groupPendingInvitations = this.currentGroup.groupInvitations.filter(
          (invitation: GroupInvitation) => invitation.state === GroupInvitationState.Pending
        );
      }
      this.initializeGroupInfo();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  initializeGroupInfo(): void {
    this.hasGroupChanges = false;
    this.userIdsToRemove = [];
    this.userIdsToPromote = [];
    this.userIdsToDemote = [];
    this.invitationIdsToRemove = [];
    this.mutatedGroup = this.currentGroup ? { ...this.currentGroup } : null;
  }

  showCreateGroupForm(): void {
    this.showingCreateGroupForm = true;
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

  saveMutatedGroup(): void {
    this.store.dispatch(
      saveGroup({
        mutatedGroup: this.mutatedGroup,
        userIdsToRemove: this.userIdsToRemove,
        userIdsToPromote: this.userIdsToPromote,
        userIdsToDemote: this.userIdsToDemote,
        invitationIdsToRemove: this.invitationIdsToRemove,
      })
    );
  }

  canLoggedInUserEdit(): boolean {
    if (!this.currentUser) return false;

    const groupUser = this.getLoggedInGroupUser();
    if (!groupUser) return false;

    return (
      groupUser.groupRole === GroupUserRole.Owner || groupUser.groupRole === GroupUserRole.Admin
    );
  }

  handleRemoveInviteClick(invitation: GroupInvitation) {
    if (
      invitation &&
      invitation.id &&
      !this.invitationIdsToRemove.find((invitationId) => invitationId === invitation.id)
    ) {
      this.setOnGroupChanges();
      this.invitationIdsToRemove.push(invitation.id);
    }
  }

  handleRemoveClick(groupUser: GroupUser | undefined): void {
    if (groupUser && groupUser.id) {
      this.setOnGroupChanges();
      if (!this.userIdsToRemove.find((userId) => userId === groupUser.id)) {
        this.userIdsToRemove.push(groupUser.id);
      }

      if (this.userIdsToDemote.find((userId) => userId === groupUser.id)) {
        this.userIdsToDemote = this.userIdsToDemote.filter((userId) => userId !== groupUser.id);
      }
      if (this.userIdsToPromote.find((userId) => userId === groupUser.id)) {
        this.userIdsToPromote = this.userIdsToPromote.filter((userId) => userId !== groupUser.id);
      }
    }
  }

  handlePromoteClick(groupUser: GroupUser | undefined): void {
    if (groupUser && groupUser.id) {
      this.setOnGroupChanges();
      if (this.userIdsToRemove.find((userId) => userId === groupUser.id)) return;
      if (this.userIdsToDemote.find((userId) => userId === groupUser.id)) {
        this.userIdsToDemote = this.userIdsToDemote.filter((userId) => userId !== groupUser.id);
      } else if (!this.userIdsToPromote.find((userId) => userId === groupUser.id)) {
        this.userIdsToPromote.push(groupUser.id);
      }
    }
  }

  handleDemoteClick(groupUser: GroupUser | undefined): void {
    if (groupUser && groupUser.id) {
      this.setOnGroupChanges();
      if (this.userIdsToRemove.find((userId) => userId === groupUser.id)) return;
      if (this.userIdsToPromote.find((userId) => userId === groupUser.id)) {
        this.userIdsToPromote = this.userIdsToPromote.filter((userId) => userId !== groupUser.id);
      } else if (!this.userIdsToDemote.find((userId) => userId === groupUser.id)) {
        this.userIdsToDemote.push(groupUser.id);
      }
    }
  }

  getLoggedInGroupUser(): GroupUser | undefined {
    return this.mutatedGroup?.groupUsers?.find((user: any) => {
      return user.userId === this.currentUser!.id;
    });
  }

  handleDeclineGroupInvitation(invitation: GroupInvitation): void {
    this.store.dispatch(declineGroupInvitation({ invitation }));
  }

  viewGroupInvitation(invitation: GroupInvitation): void {
    this.router.navigateByUrl(`/group/${invitation.groupId}`);
  }

  acceptGroupInvitation(invitation: GroupInvitation): void {
    if (this.currentGroup && this.mutatedGroup) {
      this.dialogService.open(LeaveGroupConfirmationDialogComponent, {
        data: { invitationId: invitation.id },
      });
    }
  }

  isRemovingInvite(invitation: GroupInvitation | undefined): boolean {
    return (
      !!invitation &&
      !!this.invitationIdsToRemove.find((invitationId) => invitationId === invitation.id)
    );
  }

  isRemoving(user: User | undefined): boolean {
    return !!user && !!this.userIdsToRemove.find((userId) => userId === user.id);
  }

  isPromoting(user: User | undefined): boolean {
    return !!user && !!this.userIdsToPromote.find((userId) => userId === user.id);
  }

  isDemoting(user: User | undefined): boolean {
    return !!user && !!this.userIdsToDemote.find((userId) => userId === user.id);
  }
}
