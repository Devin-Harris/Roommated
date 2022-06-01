import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { NavbarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [CommonModule, RouterModule, IconsModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavigationModule {}
