import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { LogoModule } from './logo/logo.module';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { UserAvatarModule } from './user-avatar/user-avatar.module';

@NgModule({
  imports: [CommonModule, UserAvatarModule, LogoModule],
})
export class IconsModule {}
