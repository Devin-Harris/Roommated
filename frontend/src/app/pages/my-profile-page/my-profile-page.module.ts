import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileFormModule } from 'src/app/components/forms/profile-form/profile-form.module';
import { MyProfilePageComponent } from './my-profile-page.component';

@NgModule({
  declarations: [MyProfilePageComponent],
  imports: [CommonModule, ProfileFormModule],
})
export class MyProfilePageModule {}
