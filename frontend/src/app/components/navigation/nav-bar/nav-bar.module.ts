import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../icons/icons.module';
import { LogoModule } from '../../icons/logo/logo.module';
import { UserAvatarModule } from '../../icons/user-avatar/user-avatar.module';
import { NavbarComponent } from './nav-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule, LogoModule, UserAvatarModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
