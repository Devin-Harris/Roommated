import { NgModule } from '@angular/core';
import { SignInFormModule } from 'src/app/components/forms/sign-in-form/sign-in-form.module';
import { SignInPageComponent } from './signin-page.component';

@NgModule({
  declarations: [SignInPageComponent],
  imports: [SignInFormModule],
})
export class SignInPageModule {}
