import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Group, User } from '@rmtd/common/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { groupInfoPageLoaded, getGroupById, selectGroupInfoGroup } from 'src/app/state/group';

enum GroupTabs {
  Post = 'Post',
  Users = 'Users',
}

@Component({
  selector: 'group-info-page',
  templateUrl: './group-info-page.component.html',
  styleUrls: ['./group-info-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GroupInfoPageComponent implements OnInit, OnDestroy {
  selectedTab: string = GroupTabs.Users;

  profileImageSrc: string | ArrayBuffer | null | undefined = null;

  currentGroup: Group | null = null;

  id: Number | null = null;

  readonly groupTabs = GroupTabs;

  private $destroyed = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
      }
    });

    this.store.dispatch(getGroupById({ id: this.id }));
    this.store
      .select(selectGroupInfoGroup)
      .pipe(takeUntil(this.$destroyed))
      .subscribe((group) => {
        this.currentGroup = group;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(groupInfoPageLoaded({ id: this.id }));
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
