import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroupInvitationState, GroupUserRole } from '@rmtd/common/enums';
import { Group, GroupUser, User, Application, Post } from '@rmtd/common/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCurrentUser } from 'src/app/state/authentication';
import {
  myGroupPageLoaded,
  selectCurrentUserGroup,
  selectIsGroupLoading,
} from 'src/app/state/group';

import {
  acceptReceivedGroupApplicant,
  declineReceivedGroupApplicant,
} from 'src/app/state/application';
import { storeMapFilters } from 'src/app/state/map';
import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';

enum GroupTabs {
  Posts = 'Posts',
  Applications = 'Applications',
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'my-group-page',
  templateUrl: './my-group-page.component.html',
  styleUrls: ['./my-group-page.component.scss'],
})
export class MyGroupPageComponent implements OnInit, OnDestroy {
  selectedTab: string = GroupTabs.Posts;

  showingCreateGroupForm = false;

  currentGroup: any | null = null;

  private currentUser$: Observable<User | null>;

  private currentUser: User | null = null;

  private groupLoading$: Observable<boolean>;

  groupLoading: boolean = false;

  private currentGroup$: Observable<Group | null>;

  readonly groupTabs = GroupTabs;

  private destroyed$ = new Subject<void>();

  public filteredApplications: any = [];

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    this.currentGroup$ = this.store.select(selectCurrentUserGroup);
    this.currentGroup$.pipe(takeUntil(this.destroyed$)).subscribe((group: Group | null) => {
      this.currentGroup = group;
      if (this.currentGroup.post) {
        this.filteredApplications = this.currentGroup.post.applications.filter(
          (application: Application) => {
            return application.state == GroupInvitationState.Pending;
          }
        );
      }
    });

    this.groupLoading$ = this.store.select(selectIsGroupLoading);
    this.groupLoading$.pipe(takeUntil(this.destroyed$)).subscribe((isGroupLoading: boolean) => {
      this.groupLoading = isGroupLoading;
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

  getLoggedInGroupUser(): GroupUser | undefined {
    return this.currentGroup?.groupUsers?.find((user: any) => {
      return user.userId === this.currentUser!.id;
    });
  }

  get canLoggedInUserEdit(): boolean {
    if (!this.currentUser) return false;

    const groupUser = this.getLoggedInGroupUser();
    if (!groupUser) return false;

    return (
      groupUser.groupRole === GroupUserRole.Owner || groupUser.groupRole === GroupUserRole.Admin
    );
  }

  viewReceivedGroupApplicant(applicant: Application): void {
    this.router.navigateByUrl(`/group/${applicant.applicantGroupId}`);
  }

  viewSentApplicationGroup(post: Post): void {
    this.store.dispatch(
      storeMapFilters({
        filters: {
          mapCenterLat: post.location.lat,
          mapCenterLng: post.location.lng,
          mapZoom: 16,
        },
      })
    );

    requestAnimationFrame(() => {
      this.router.navigateByUrl('/map?openSidebarInit=true');
    });
  }

  handleDeclineReceivedGroupApplicant(applicant: Application): void {
    this.store.dispatch(declineReceivedGroupApplicant({ applicant }));
  }

  handleAcceptReceivedGroupApplicant(applicant: Application): void {
    this.store.dispatch(acceptReceivedGroupApplicant({ applicant }));
  }
}
