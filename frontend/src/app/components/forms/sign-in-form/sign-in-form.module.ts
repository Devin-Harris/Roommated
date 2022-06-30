import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignInFormComponent } from './sign-in-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [SignInFormComponent],
  exports: [SignInFormComponent],
})
export class SignInFormModule {}
