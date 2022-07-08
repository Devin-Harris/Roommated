import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionCardModule } from '../../cards/action-card/action-card.module';
import { GroupMemberCardModule } from '../../cards/group-member-card/group-member-card.module';
import { InviteGroupMemberDialogModule } from '../../dialogs/invite-group-member-dialog/invite-group-member-dialog.module';
import { LeaveGroupConfirmationDialogModule } from '../../dialogs/leave-group-confirmation-dialog/leave-group-confirmation-dialog.module';
import { AccordionModule } from '../../misc/accordion/accordion.module';
import { RadioSliderModule } from '../../toggles/radio-slider/radio-slider.module';
import { BaseSidebarSliderModule } from '../base-sidebar-slider/base-sidebar-slider.module';

import { MyGroupSidebarComponent } from './my-group-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseSidebarSliderModule,
    AccordionModule,
    RadioSliderModule,
    GroupMemberCardModule,
    ActionCardModule,
    InviteGroupMemberDialogModule,
    LeaveGroupConfirmationDialogModule,
  ],
  declarations: [MyGroupSidebarComponent],
  exports: [MyGroupSidebarComponent],
})
export class MyGroupSidebarModule {}
