import { Component, Input } from '@angular/core';


// TODO: build user interface off database table and store in more global location
export interface User {
  firstname: string,
  lastname: string,
  profileImageUrl?: string
}

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() user: User | null = null

  constructor() { }
}
