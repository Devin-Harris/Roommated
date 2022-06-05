import { NgModule } from '@angular/core';
import { AuthenticationModule } from 'src/app/state/authentication/authentication.module';
import { SignUpPageComponent } from './signup-page.component';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [AuthenticationModule],
})
export class SignUpPageModule {}
