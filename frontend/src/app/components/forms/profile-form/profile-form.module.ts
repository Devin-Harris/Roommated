import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileModule } from 'src/app/state/profile/profile.module';
import { ProfileFormComponent } from './profile-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ProfileModule],
  declarations: [ProfileFormComponent],
  exports: [ProfileFormComponent],
})
export class ProfileFormModule {}
