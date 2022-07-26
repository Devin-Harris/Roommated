import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionCardComponent } from 'src/app/components/cards/action-card/action-card.component';
import { ActionCardModule } from 'src/app/components/cards/action-card/action-card.module';
import { CreateGroupFormModule } from 'src/app/components/forms/create-group-form/create-group-form.module';
import { CreatePostFormModule } from 'src/app/components/forms/create-post-form/create-post-form.module';
import { EditPostFormModule } from 'src/app/components/forms/edit-post-form/edit-post-form.module';
import { AccordionModule } from 'src/app/components/misc/accordion/accordion.module';
import { TabGroupModule } from 'src/app/components/misc/tab-group/tab-group.module';
import { MyGroupSidebarModule } from 'src/app/components/sidebar-slider/my-group-sidebar/my-group-sidebar.module';
import { ApplicationModule } from 'src/app/state/application/application.module';
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
    CreatePostFormModule,
    EditPostFormModule,
    ApplicationModule,
    AccordionModule,
    ActionCardModule
    ],
})
export class MyGroupPageModule {}
