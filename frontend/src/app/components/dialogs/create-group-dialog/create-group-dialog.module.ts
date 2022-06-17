import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { CreateGroupDialogComponent } from './create-group-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule],
  declarations: [CreateGroupDialogComponent],
  exports: [CreateGroupDialogComponent],
})
export class CreateGroupDialogModule {}
