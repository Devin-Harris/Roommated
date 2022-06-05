import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateUserDto } from '@rmtd/common/dtos';
import { Gender } from '@rmtd/common/enums';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions'


@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignUpPageComponent {
  constructor(private store: Store) {}

  triggerSignUpTest() {
    const createUserInfo: CreateUserDto = {
      firstname: 'Test 10',
      lastname: 'Test 10',
      email: 'Test10@gmail.com',
      password: 'pass',
      birthdate: new Date(),
      gender: Gender.Female
    }

    this.store.dispatch(AuthenticationActions.signup({
      createUserInfo
    }))
  }
}
