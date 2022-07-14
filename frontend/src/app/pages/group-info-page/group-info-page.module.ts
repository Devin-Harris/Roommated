import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateGroupFormModule } from 'src/app/components/forms/create-group-form/create-group-form.module';
import { MyGroupSidebarModule } from 'src/app/components/misc/my-group-sidebar/my-group-sidebar.module';
import { TabGroupModule } from 'src/app/components/misc/tab-group/tab-group.module';
import { AuthenticationInterceptor } from 'src/app/state/authentication/AuthenticationInterceptor.service';
import { GroupModule } from 'src/app/state/group/group.module';
import { GroupInfoPageComponent } from './group-info-page.component';
import { UserAvatarModule } from 'src/app/components/icons/user-avatar/user-avatar.module';


@NgModule({
  declarations: [GroupInfoPageComponent],
  imports: [
    CommonModule,
    GroupModule,
    FormsModule,
    TabGroupModule,
    MyGroupSidebarModule,
    CreateGroupFormModule,
    UserAvatarModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }]
})
export class GroupInfoPageModule {}
