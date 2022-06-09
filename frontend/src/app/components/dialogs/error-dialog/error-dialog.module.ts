import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { ErrorDialogComponent } from './error-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule],
  declarations: [ErrorDialogComponent],
  exports: [ErrorDialogComponent],
})
export class ErrorDialogModule {}
