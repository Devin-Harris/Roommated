import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, skip, Subject, takeUntil } from 'rxjs';
import { login, selectIsLoggedIn, selectLoginFail } from 'src/app/state/authentication';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss'],
})
export class SignInDialogComponent extends BaseDialogComponent implements OnDestroy {
  headerOverride?;

  password = '';

  email = '';

  $loginFail!: Observable<boolean | null>;

  $loginSuccess: Observable<boolean | null>;

  private destroyed$ = new Subject<void>();

  constructor(
    dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: { headerOverride?: string },
    private store: Store
  ) {
    super(dialogRef, data);
    this.headerOverride = data.headerOverride;
    this.$loginFail = this.store.select(selectLoginFail);
    this.$loginSuccess = this.store.select(selectIsLoggedIn);
    this.$loginSuccess.pipe(takeUntil(this.destroyed$), skip(1)).subscribe((loginSuccess) => {
      if (loginSuccess) {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  handleEmailChange(email: string) {
    this.email = email;
  }

  handlePasswordChange(password: string) {
    this.password = password;
  }

  signIn(): void {
    this.store.dispatch(login({ email: this.email, password: this.password, routeToMap: false }));
  }
}
