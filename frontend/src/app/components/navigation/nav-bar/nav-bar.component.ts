import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { Observable } from 'rxjs';
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from 'src/app/state/authentication';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;

  currentUser$: Observable<User | null>;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }
}
