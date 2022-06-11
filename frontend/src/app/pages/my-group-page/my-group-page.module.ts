import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionCardModule } from 'src/app/components/cards/action-card/action-card.module';
import { GroupMemberCardModule } from 'src/app/components/cards/group-member-card/group-member-card.module';
import { InviteGroupMemberDialogModule } from 'src/app/components/dialogs/invite-group-member-dialog/invite-group-member-dialog.module';
import { UserAvatarModule } from 'src/app/components/icons/user-avatar/user-avatar.module';
import { AccordionModule } from 'src/app/components/misc/accordion/accordion.module';
import { SidebarSliderModule } from 'src/app/components/misc/sidebar-slider/sidebar-slider.module';
import { TabGroupModule } from 'src/app/components/misc/tab-group/tab-group.module';
import { RadioSliderModule } from 'src/app/components/toggles/radio-slider/radio-slider.module';
import { MyGroupPageComponent } from './my-group-page.component';

@NgModule({
  declarations: [MyGroupPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SidebarSliderModule,
    AccordionModule,
    UserAvatarModule,
    RadioSliderModule,
    TabGroupModule,
    GroupMemberCardModule,
    ActionCardModule,
    InviteGroupMemberDialogModule,
  ],
})
export class MyGroupPageModule {}
