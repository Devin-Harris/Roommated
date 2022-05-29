import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
