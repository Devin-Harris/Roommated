import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectAuthErrors, selectSigningUp } from 'src/app/state/authentication';

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignUpPageComponent implements OnDestroy {
  @ViewChild('profileImage') profileImage!: ElementRef;

  form: FormGroup;

  currentPage = 0;

  genderOptions = Object.keys(Gender);

  signingUp$: Observable<boolean>;

  errors: string[] | null = null;

  private error$: Observable<string[] | null>;

  private destroyed$ = new Subject<void>();

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
            Validators.compose([Validators.required, this.passwordValidator.validPassword()])
          ),
          confirmPassword: new FormControl('', Validators.required),
        },
        {
          validator: this.passwordValidator.matchPassword('password', 'confirmPassword'),
        }
      ),
      page2: this.fb.group({
        birthdate: new FormControl(null, Validators.required),
        gender: new FormControl('', Validators.required),
        bio: new FormControl(''),
      }),
    });

    this.signingUp$ = this.store.select(selectSigningUp);
    this.error$ = this.store.select(selectAuthErrors);
    this.error$.pipe(takeUntil(this.destroyed$)).subscribe((e: string[] | null) => {
      this.errors = e;
    });
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
        password: this.getFormControlFromPage('page1', 'password')?.value,
        birthdate: new Date(this.getFormControlFromPage('page2', 'birthdate')?.value),
        gender: this.getFormControlFromPage('page2', 'gender')?.value,
      };

      let payload: { createUserInfo: CreateUserDto; profileImage?: File } = {
        createUserInfo,
      };
      const profileImage = this.profileImage.nativeElement.files[0];
      if (profileImage) {
        payload.profileImage = profileImage;
      }

      this.store.dispatch(AuthenticationActions.signup(payload));
    }
  }

  dismissError() {
    this.errors = null;
  }
}
