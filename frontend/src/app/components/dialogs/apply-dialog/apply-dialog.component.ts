import { Component, Inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { applyToPost } from 'src/app/state/application';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'apply-dialog',
  templateUrl: './apply-dialog.component.html',
  styleUrls: ['./apply-dialog.component.scss'],
})
export class ApplyDialogComponent extends BaseDialogComponent {
  applicationMessage = '';

  constructor(
    private store: Store,
    dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: { postId: number }
  ) {
    super(dialogRef, data);
  }

  apply(): void {
    this.store.dispatch(
      applyToPost({ postId: this.data.postId, message: this.applicationMessage })
    );
    this.close();
  }
}
