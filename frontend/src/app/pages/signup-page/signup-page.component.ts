import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateUserDto } from '@rmtd/common/dtos';
import { Gender } from '@rmtd/common/enums';
import { CustomvalidationService } from 'src/app/customvalidation.service';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions'


@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignUpPageComponent {
  form: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private customValidator: CustomvalidationService) {
    this.form = this.fb.group({
      page1: this.fb.group({
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          phone: new FormControl(''),
          password: new FormControl('', Validators.compose([Validators.required, this.customValidator.validPassword()])),
          confirmPassword: new FormControl('', Validators.required),
        },
        {
          validator: this.customValidator.matchPassword('password', 'confirmPassword'),
        }
      ),
      page2: this.fb.group({
        birthdate: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required),
        bio: new FormControl(''),
      }),
      page3: this.fb.group({
        profileImage: new FormControl(null),
      }),
    })
  }

  triggerSignUpTest() {
    const createUserInfo: CreateUserDto = {
      firstname: 'Test 10',
      lastname: 'Test 10',
      email: 'Test10@gmail.com',
      profileImageUrl: 'https://images.unsplash.com/photo-1654336367952-a57a4afbc2e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      password: 'pass',
      birthdate: new Date(),
      gender: Gender.Female
    }

    this.store.dispatch(AuthenticationActions.signup({
      createUserInfo
    }))
  }
}
