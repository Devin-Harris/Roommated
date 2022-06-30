import { Component, Inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/app/state/authentication';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss'],
})
export class SignInDialogComponent extends BaseDialogComponent {
  headerOverride?;

  password = '';

  email = '';

  constructor(
    dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: { headerOverride?: string },
    private store: Store
  ) {
    super(dialogRef, data);

    this.headerOverride = data.headerOverride;
  }

  handleEmailChange(email: string) {
    this.email = email;
  }

  handlePasswordChange(password: string) {
    this.password = password;
  }

  signIn(): void {
    this.store.dispatch(login({ email: this.email, password: this.password, routeToMap: false }));
    this.close();
  }
}
