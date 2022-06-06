import { Component } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateUserDto } from '@rmtd/common/dtos';
import { Gender } from '@rmtd/common/enums';
import { PasswordValidationService } from './passwordvalidation.service';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignUpPageComponent {
  form: FormGroup;

  currentPage = 2;

  genderOptions = Object.keys(Gender);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private passwordValidator: PasswordValidationService
  ) {
    this.form = this.fb.group({
      page1: this.fb.group(
        {
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          phone: new FormControl(''),
          password: new FormControl(
            '',
            Validators.compose([
              Validators.required,
              this.passwordValidator.validPassword(),
            ])
          ),
          confirmPassword: new FormControl('', Validators.required),
        },
        {
          validator: this.passwordValidator.matchPassword(
            'password',
            'confirmPassword'
          ),
        }
      ),
      page2: this.fb.group({
        birthdate: new FormControl(null, Validators.required),
        gender: new FormControl('', Validators.required),
        bio: new FormControl(''),
      }),
      page3: this.fb.group({
        profileImage: new FormControl(null),
      }),
    });
  }

  getFormPage(pageName: string): AbstractControl | undefined | null {
    return this.form.get(pageName);
  }

  getFormControlFromPage(
    pageName: string,
    formControlName: string
  ): AbstractControl | undefined | null {
    return this.getFormPage(pageName)?.get(formControlName);
  }

  setCurrentPage(page: number) {
    if (page > 2 || page < 0 || page === this.currentPage) return;
    this.currentPage = page;
  }

  handleFormButtonClick(): void {
    if (this.currentPage === 2) {
      this.submitForm();
    } else {
      this.currentPage += 1;
    }
  }

  submitForm() {
    if (this.form.valid) {
      // TODO: upload profileImage and get url to said image
      const profileImageUrl =
        'https://images.unsplash.com/photo-1654336367952-a57a4afbc2e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

      const createUserInfo: CreateUserDto = {
        firstname: this.getFormControlFromPage('page1', 'firstname')?.value,
        lastname: this.getFormControlFromPage('page1', 'lastname')?.value,
        email: this.getFormControlFromPage('page1', 'email')?.value,
        profileImageUrl,
        password: this.getFormControlFromPage('page1', 'password')?.value,
        birthdate: new Date(),
        gender: Gender.Female,
      };

      console.log(createUserInfo);
      // this.store.dispatch(
      //   AuthenticationActions.signup({
      //     createUserInfo,
      //   })
      // );
    }
  }
}
