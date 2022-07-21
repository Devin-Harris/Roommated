import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplyDialogModule } from '../../dialogs/apply-dialog/apply-dialog.module';
import { BaseSidebarSliderModule } from '../base-sidebar-slider/base-sidebar-slider.module';
import { PostSidebarComponent } from './post-sidebar.component';

@NgModule({
  imports: [CommonModule, BaseSidebarSliderModule, RouterModule, ApplyDialogModule],
  declarations: [PostSidebarComponent],
  exports: [PostSidebarComponent],
})
export class PostSidebarModule {}
