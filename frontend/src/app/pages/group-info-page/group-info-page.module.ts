import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateGroupFormModule } from 'src/app/components/forms/create-group-form/create-group-form.module';
import { TabGroupModule } from 'src/app/components/misc/tab-group/tab-group.module';
import { MyGroupSidebarModule } from 'src/app/components/sidebar-slider/my-group-sidebar/my-group-sidebar.module';
import { GroupModule } from 'src/app/state/group/group.module';
import { GroupInfoPageComponent } from './group-info-page.component';

@NgModule({
  declarations: [GroupInfoPageComponent],
  imports: [
    CommonModule,
    GroupModule,
    FormsModule,
    TabGroupModule,
    MyGroupSidebarModule,
    CreateGroupFormModule,
  ],
})
export class GroupInfoPageModule {}
