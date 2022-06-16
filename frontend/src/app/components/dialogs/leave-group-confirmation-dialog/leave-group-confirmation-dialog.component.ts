import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { User } from '@rmtd/common/interfaces';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'leave-group-confirmation-dialog',
  templateUrl: './leave-group-confirmation-dialog.component.html',
  styleUrls: ['./leave-group-confirmation-dialog.component.scss'],
})
export class LeaveGroupConfirmationDialogComponent extends BaseDialogComponent {
  constructor(dialogRef: DialogRef, @Inject(DIALOG_DATA) data: { groupToJoinId?: number }) {
    super(dialogRef, data);
  }

  confirm(): void {
    // TODO: dispatch action to remove logged in user

    if (this.data?.groupToJoinId) {
      // TODO: join group if a groupToJoinId is passed in
    }

    this.close();
  }
}
