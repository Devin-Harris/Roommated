import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseSidebarSliderComponent } from './base-sidebar-slider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BaseSidebarSliderComponent],
  exports: [BaseSidebarSliderComponent],
})
export class BaseSidebarSliderModule {}
