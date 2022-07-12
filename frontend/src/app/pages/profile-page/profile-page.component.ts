import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { profilePageLoaded, selectUserProfile } from 'src/app/state/profile';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  $profileUser: Observable<User | null>;

  id: Number | null = null;

  profileName = '';

  private $destroyed = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute) {
    this.route.params.pipe(takeUntil(this.$destroyed)).subscribe((params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
      }
    });

    this.$profileUser = this.store.select(selectUserProfile);
    this.$profileUser.pipe(takeUntil(this.$destroyed)).subscribe((profileUser) => {
      this.profileName = profileUser?.firstname + ' ' + profileUser?.lastname;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(profilePageLoaded({ id: this.id }));
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
