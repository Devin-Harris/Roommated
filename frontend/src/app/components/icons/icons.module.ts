import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LogoComponent, UserAvatarComponent],
  exports: [LogoComponent, UserAvatarComponent],
})
export class IconsModule {}
