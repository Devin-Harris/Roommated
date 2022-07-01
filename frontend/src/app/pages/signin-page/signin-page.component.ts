import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, selectLoginFail } from 'src/app/state/authentication';

@Component({
  selector: 'signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SignInPageComponent {
  password = '';

  email = '';

  $loginFail: Observable<boolean | null>;

  constructor(private store: Store) {
    this.$loginFail = this.store.select(selectLoginFail);
  }

  handleEmailChange(email: string) {
    this.email = email;
  }

  handlePasswordChange(password: string) {
    this.password = password;
  }

  signIn() {
    this.store.dispatch(login({ email: this.email, password: this.password, routeToMap: true }));
  }
}
