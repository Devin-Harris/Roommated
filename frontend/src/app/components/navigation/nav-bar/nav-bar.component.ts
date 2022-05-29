import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from 'src/app/state/authentication';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavbarComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)
  }
}
