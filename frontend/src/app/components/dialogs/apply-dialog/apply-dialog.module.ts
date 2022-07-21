import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { ApplyDialogComponent } from './apply-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule, ReactiveFormsModule, FormsModule],
  declarations: [ApplyDialogComponent],
  exports: [ApplyDialogComponent],
})
export class ApplyDialogModule {}
