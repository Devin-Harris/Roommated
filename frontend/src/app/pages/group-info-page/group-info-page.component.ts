// import { Component } from '@angular/core';

// @Component({
//   selector: 'group-info-page',
//   templateUrl: './group-info-page.component.html',
//   styleUrls: ['./group-info-page.component.scss'],
// })
// export class GroupInfoPageComponent {}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';
import { User } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/components/dialogs/base/dialog.service';
import { InviteGroupMemberDialogComponent } from 'src/app/components/dialogs/invite-group-member-dialog/invite-group-member-dialog.component';
import { LeaveGroupConfirmationDialogComponent } from 'src/app/components/dialogs/leave-group-confirmation-dialog/leave-group-confirmation-dialog.component';
import { selectCurrentUser } from 'src/app/state/authentication';
import {
  myGroupPageLoaded,
  selectCurrentUserGroup,
  selectCurrentUserGroupInvitations,
} from 'src/app/state/group';

enum GroupTabs {
  Post = 'Post',
  Users = 'Users',
}

@Component({
  selector: 'group-info-page',
  templateUrl: './group-info-page.component.html',
  styleUrls: ['./group-info-page.component.scss'],
})
export class GroupInfoPageComponent implements OnInit, OnDestroy {
  selectedTab: string = GroupTabs.Post;

  showingCreateGroupForm = false;

  currentGroup: any | null = null;

  private currentUser$: Observable<User | null>;

  private currentUser: User | null = null;

  private currentGroup$: any;

  readonly groupTabs = GroupTabs;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    this.currentGroup$ = this.store.select(selectCurrentUserGroup);
    this.currentGroup$.pipe(takeUntil(this.destroyed$)).subscribe((group: any) => {
      this.currentGroup = group;
    });

    this.route.queryParams.pipe(takeUntil(this.destroyed$)).subscribe((qp) => {
      this.showingCreateGroupForm = qp['showCreateGroupForm'] === 'true';
    });
  }

  ngOnInit(): void {
    this.store.dispatch(myGroupPageLoaded());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  showCreateGroupForm(): void {
    this.showingCreateGroupForm = true;
  }
}
