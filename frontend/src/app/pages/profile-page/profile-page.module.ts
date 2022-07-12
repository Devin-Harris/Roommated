import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileFormModule } from 'src/app/components/forms/profile-form/profile-form.module';
import { ProfileModule } from 'src/app/state/profile/profile.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, ProfileFormModule, ProfileModule],
})
export class ProfilePageModule {}
