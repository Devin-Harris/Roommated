import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { Observable } from 'rxjs';
import { selectCurrentUser } from 'src/app/state/authentication';

@Component({
  selector: 'my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss'],
})
export class MyProfilePageComponent {
  $currentUser: Observable<User | null>;

  constructor(private store: Store) {
    this.$currentUser = this.store.select(selectCurrentUser);
  }
}
