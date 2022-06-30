import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignInFormModule } from '../../forms/sign-in-form/sign-in-form.module';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { SignInDialogComponent } from './sign-in-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule, SignInFormModule],
  declarations: [SignInDialogComponent],
  exports: [SignInDialogComponent],
})
export class SignInDialogModule {}
