import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  AbstractControl,
  Form,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateUserDto } from '@rmtd/common/dtos';
import { Gender } from '@rmtd/common/enums';
import { PasswordValidationService } from './passwordvalidation.service';
import * as AuthenticationActions from 'src/app/state/authentication/authentication.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectAuthErrors, selectSigningUp } from 'src/app/state/authentication';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignUpPageComponent implements OnDestroy {
  @ViewChild('profileImage') profileImage!: ElementRef;

  form: UntypedFormGroup;

  currentPage = 0;

  genderOptions = Object.keys(Gender);

  signingUp$: Observable<boolean>;

  private destroyed$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: UntypedFormBuilder,
    private passwordValidator: PasswordValidationService
  ) {
    this.form = this.fb.group({
      page1: this.fb.group(
        {
          firstname: new UntypedFormControl('', Validators.required),
          lastname: new UntypedFormControl('', Validators.required),
          email: new UntypedFormControl('', [Validators.required, Validators.email]),
          phone: new UntypedFormControl('', Validators.pattern(new RegExp('[0-9]{10}'))),
          password: new UntypedFormControl(
            '',
            Validators.compose([Validators.required, this.passwordValidator.validPassword()])
          ),
          confirmPassword: new UntypedFormControl('', Validators.required),
        },
        {
          validator: this.passwordValidator.matchPassword('password', 'confirmPassword'),
        }
      ),
      page2: this.fb.group({
        birthdate: new UntypedFormControl(null, Validators.required),
        gender: new UntypedFormControl('', Validators.required),
        bio: new UntypedFormControl(''),
      }),
    });

    this.signingUp$ = this.store.select(selectSigningUp);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
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
      const createUserInfo: CreateUserDto = {
        firstname: this.getFormControlFromPage('page1', 'firstname')?.value,
        lastname: this.getFormControlFromPage('page1', 'lastname')?.value,
        email: this.getFormControlFromPage('page1', 'email')?.value,
        phone: this.getFormControlFromPage('page1', 'phone')?.value
          ? this.getFormControlFromPage('page1', 'phone')?.value
          : undefined,
        password: this.getFormControlFromPage('page1', 'password')?.value,
        birthdate: new Date(this.getFormControlFromPage('page2', 'birthdate')!.value)
          .toISOString()
          .slice(0, 10),
        gender: this.getFormControlFromPage('page2', 'gender')?.value,
        bio: this.getFormControlFromPage('page2', 'bio')?.value,
      };

      let payload: { createUserInfo: CreateUserDto; profileImage?: File } = {
        createUserInfo,
      };

      const profileImage = this.profileImage?.nativeElement?.files[0];
      if (profileImage) {
        payload.profileImage = profileImage;
      }

      this.store.dispatch(AuthenticationActions.signup(payload));
    }
  }

  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, '');
    }
  }
}
