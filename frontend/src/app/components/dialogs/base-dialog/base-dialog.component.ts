import { Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss'],
})
export class BaseDialogComponent {
  constructor(private dialogRef: DialogRef, @Inject(DIALOG_DATA) public data: string) {}

  close() {
    this.dialogRef.close();
  }
}
