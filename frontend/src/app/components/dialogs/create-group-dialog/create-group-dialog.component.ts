import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  selector: 'create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss'],
})
export class CreateGroupDialogComponent extends BaseDialogComponent {
  constructor(dialogRef: DialogRef, @Inject(DIALOG_DATA) data: any, private router: Router) {
    super(dialogRef, data);
  }

  goToGroupPage(): void {
    this.router.navigateByUrl('/my-group');
    this.close();
  }
}
