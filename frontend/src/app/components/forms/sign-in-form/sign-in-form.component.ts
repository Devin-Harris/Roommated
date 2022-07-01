import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent {
  @Input('email') email = '';

  @Input('password') password = '';

  @Input('showSignInButton') showSignInButton = true;

  @Input('showHeading') showHeading = true;

  @Input('showFailedLoginAttemptErrorMessage') showFailedLoginAttemptErrorMessage: boolean | null =
    null;

  @Output() emailChange = new EventEmitter<string>();

  @Output() passwordChange = new EventEmitter<string>();

  @Output() signInClick = new EventEmitter<void>();

  constructor() {}

  handleEmailChange(e: any) {
    this.emailChange.emit(e.target.value);
  }

  handlePasswordChange(e: any) {
    this.passwordChange.emit(e.target.value);
  }

  signIn() {
    this.signInClick.emit();
  }
}
