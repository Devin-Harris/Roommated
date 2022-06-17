import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserAvatarModule } from '../../icons/user-avatar/user-avatar.module';
import { GroupMemberCardComponent } from './group-member-card.component';

@NgModule({
  imports: [CommonModule, UserAvatarModule],
  declarations: [GroupMemberCardComponent],
  exports: [GroupMemberCardComponent],
})
export class GroupMemberCardModule {}
