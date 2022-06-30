import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/state/authentication';

@Component({
  selector: 'signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SignInPageComponent {
  password = '';

  email = '';

  constructor(private store: Store) {}

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
