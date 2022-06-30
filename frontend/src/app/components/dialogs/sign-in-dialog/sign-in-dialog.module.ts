import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { SignInDialogComponent } from './sign-in-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule],
  declarations: [SignInDialogComponent],
  exports: [SignInDialogComponent],
})
export class SignInDialogModule {}
