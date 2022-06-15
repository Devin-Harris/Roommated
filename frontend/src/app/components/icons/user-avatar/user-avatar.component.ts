import { Component, Input } from '@angular/core';
import { User } from '@rmtd/common/interfaces';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() user: User | null = null

  constructor() { }
}
