import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserAvatarComponent],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
