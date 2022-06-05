import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignUpPageComponent } from './signup-page.component';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [AuthenticationModule, ReactiveFormsModule],
})
export class SignUpPageModule {}
