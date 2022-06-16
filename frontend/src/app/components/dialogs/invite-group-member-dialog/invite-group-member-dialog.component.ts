import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { User } from '@rmtd/common/interfaces';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { DIALOG_DATA } from '../base/dialog-tokens';
import { DialogRef } from '../base/dialogRef';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'invite-group-member-dialog',
  templateUrl: './invite-group-member-dialog.component.html',
  styleUrls: ['./invite-group-member-dialog.component.scss'],
})
export class InviteGroupMemberDialogComponent extends BaseDialogComponent {
  usersToInvite: User[] = [
    {
      id: 1,
      firstname: 'Devin',
      lastname: 'Harris',
      profileImageUrl: undefined,
    },
  ];

  constructor(dialogRef: DialogRef, @Inject(DIALOG_DATA) data: { errors: string[] }) {
    super(dialogRef, data);
  }

  sendInvites(): void {
    // TODO: dispatch action that send group invites
    this.close();
  }

  removeUserFromInvitesToSend(user: User): void {
    this.usersToInvite = this.usersToInvite.filter((userToInvite) => {
      return userToInvite.id !== user.id;
    });
  }
}
