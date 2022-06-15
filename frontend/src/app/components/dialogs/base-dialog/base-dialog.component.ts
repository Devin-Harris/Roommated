import { Component, Inject, Input } from '@angular/core';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss'],
})
export class BaseDialogComponent {
  @Input() showClose = true;

  data: any;

  constructor(private dialogRef: DialogRef, @Inject(DIALOG_DATA) data: any) {
    this.data = data;
  }

  close() {
    this.dialogRef.close();
  }
}
