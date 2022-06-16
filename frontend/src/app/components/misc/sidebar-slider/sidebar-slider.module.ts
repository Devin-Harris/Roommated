import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarSliderComponent } from './sidebar-slider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarSliderComponent],
  exports: [SidebarSliderComponent],
})
export class SidebarSliderModule {}
