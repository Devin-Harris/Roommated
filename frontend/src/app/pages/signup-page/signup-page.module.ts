import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignUpPageComponent } from './signup-page.component';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    CommonModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignUpPageModule {}
