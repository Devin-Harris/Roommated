import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { ActionCardModule } from 'src/app/components/cards/action-card/action-card.module';
import { GroupMemberCardModule } from 'src/app/components/cards/group-member-card/group-member-card.module';
import { InviteGroupMemberDialogModule } from 'src/app/components/dialogs/invite-group-member-dialog/invite-group-member-dialog.module';
import { LeaveGroupConfirmationDialogModule } from 'src/app/components/dialogs/leave-group-confirmation-dialog/leave-group-confirmation-dialog.module';
import { CreateGroupFormModule } from 'src/app/components/forms/create-group-form/create-group-form.module';
import { UserAvatarModule } from 'src/app/components/icons/user-avatar/user-avatar.module';
import { AccordionModule } from 'src/app/components/misc/accordion/accordion.module';
import { MyGroupSidebarModule } from 'src/app/components/misc/my-group-sidebar/my-group-sidebar.module';
import { SidebarSliderModule } from 'src/app/components/misc/sidebar-slider/sidebar-slider.module';
import { TabGroupModule } from 'src/app/components/misc/tab-group/tab-group.module';
import { RadioSliderModule } from 'src/app/components/toggles/radio-slider/radio-slider.module';
import { GroupModule } from 'src/app/state/group/group.module';
import { MyGroupPageComponent } from './my-group-page.component';

@NgModule({
  declarations: [MyGroupPageComponent],
  imports: [
    CommonModule,
    GroupModule,
    FormsModule,
    TabGroupModule,
    MyGroupSidebarModule,
    CreateGroupFormModule,
  ],
})
export class MyGroupPageModule {}
