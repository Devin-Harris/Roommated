import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { Observable } from 'rxjs';
import { profilePageLoaded, selectUserProfile } from 'src/app/state/profile';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  $profileUser: Observable<User | null>;

  id: Number | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
      }
    });

    this.$profileUser = this.store.select(selectUserProfile);
  }

  ngOnInit(): void {
    this.store.dispatch(profilePageLoaded({ id: this.id }));
  }
}
