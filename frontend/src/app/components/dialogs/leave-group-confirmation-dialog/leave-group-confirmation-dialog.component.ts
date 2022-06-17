import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@rmtd/common/interfaces';
import { leaveGroup } from 'src/app/state/group';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'leave-group-confirmation-dialog',
  templateUrl: './leave-group-confirmation-dialog.component.html',
  styleUrls: ['./leave-group-confirmation-dialog.component.scss'],
})
export class LeaveGroupConfirmationDialogComponent extends BaseDialogComponent {
  constructor(
    dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: { groupToJoinId?: number },
    private store: Store
  ) {
    super(dialogRef, data);
  }

  confirm(): void {
    if (this.data?.groupToJoinId) {
      // TODO: join group if a groupToJoinId is passed in
    } else {
      this.store.dispatch(leaveGroup());
    }

    this.close();
  }
}
