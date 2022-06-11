import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupMemberCardModule } from '../../cards/group-member-card/group-member-card.module';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { InviteGroupMemberDialogComponent } from './invite-group-member-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule, GroupMemberCardModule],
  declarations: [InviteGroupMemberDialogComponent],
  exports: [InviteGroupMemberDialogComponent],
})
export class InviteGroupMemberDialogModule {}
