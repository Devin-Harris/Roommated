import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { FooterComponent } from './footer-bar/footer-bar.component';
import { FooterbarModule } from './footer-bar/footer-bar.module';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { NavbarModule } from './nav-bar/nav-bar.module';

@NgModule({
  imports: [CommonModule, NavbarModule, FooterbarModule],
})
export class NavigationModule {}
