import { Component, Inject, Input } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent extends BaseDialogComponent {
  constructor(dialogRef: DialogRef, @Inject(DIALOG_DATA) data: { errors: string[] }) {
    super(dialogRef, data);
  }
}
