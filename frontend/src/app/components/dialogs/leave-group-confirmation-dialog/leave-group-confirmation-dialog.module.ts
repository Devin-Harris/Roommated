import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseDialogModule } from '../base-dialog/base-dialog.module';
import { LeaveGroupConfirmationDialogComponent } from './leave-group-confirmation-dialog.component';

@NgModule({
  imports: [CommonModule, BaseDialogModule],
  declarations: [LeaveGroupConfirmationDialogComponent],
  exports: [LeaveGroupConfirmationDialogComponent],
})
export class LeaveGroupConfirmationDialogModule {}
