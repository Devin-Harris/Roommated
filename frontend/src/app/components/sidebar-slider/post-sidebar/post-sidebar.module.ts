import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseSidebarSliderModule } from '../base-sidebar-slider/base-sidebar-slider.module';
import { PostSidebarComponent } from './post-sidebar.component';

@NgModule({
  imports: [CommonModule, BaseSidebarSliderModule],
  declarations: [PostSidebarComponent],
  exports: [PostSidebarComponent],
})
export class PostSidebarModule {}
