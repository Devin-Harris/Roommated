import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

const PARKING_TYPES = [
  { name: 'garage', value: 'garage', label: 'House Garage' },
  { name: 'onstreet', value: 'onstreet', label: 'On street' },
  { name: 'paid', value: 'paid', label: 'Paid parking lot' },
];

@Component({
  selector: 'create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent {
  form: FormGroup;
  parkingRadios = PARKING_TYPES;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      leaseStart: ['', Validators.required],
      leaseEnd: ['', Validators.required],
      description: [''],
      petsAllowed: [false],
      parkingType: ['', Validators.required],
    });
    console.log(this.form.value);
  }

  submit(): void {
    console.log(this.form.value);
    // TODO: dispatch action to store to create group from form information and add current logged in user as owner
  }

  showPicker(dateInputElement: any) {
    // Can't use the HTMLInputElement type because TS does not support the 'showPicker' function yet
    // But this is supported on all major browsers so we're safe to use https://caniuse.com/mdn-api_htmlinputelement_showpicker
    dateInputElement.showPicker();
  }

  get leaseStart() {
    return this.form.get('leaseStart')!;
  }

  get leaseEnd() {
    return this.form.get('leaseEnd')!;
  }

  get description() {
    return this.form.get('description')!;
  }

  get parkingType() {
    return this.form.get('parkingType')!;
  }

  get petsAllowed() {
    return this.form.get('petsAllowed');
  }
}
