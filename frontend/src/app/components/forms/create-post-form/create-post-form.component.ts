import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location, Post } from '@rmtd/common/interfaces';

const PARKING_TYPES = [
  { name: 'garage', value: 'garage', label: 'House Garage' },
  { name: 'onstreet', value: 'onstreet', label: 'On street' },
  { name: 'paid', value: 'paid', label: 'Paid parking lot' },
];

const HOUSE_TYPES = [
  { name: 'apartment', value: 'apartment', label: 'Apartment' },
  { name: 'house', value: 'house', label: 'House' },
];

const leaseEndGreaterThanStartValidator: ValidatorFn = (control) => {
  const start = control.get('leaseStart')?.value as string;
  const end = control.get('leaseEnd')?.value as string;

  return start && end && start >= end
    ? { illogicalLeaseDates: 'Lease end must be greater than least start' }
    : null;
};

@Component({
  selector: 'create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent {
  form: FormGroup;
  parkingRadios = PARKING_TYPES;
  houseRadios = HOUSE_TYPES;
  locationObj!: Location;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group(
      {
        leaseStart: ['', Validators.required],
        leaseEnd: ['', Validators.required],
        description: [''],
        petsAllowed: [false],
        parkingType: ['', Validators.required],
        houseType: ['', Validators.required],
        location: ['', Validators.required],
      },
      { validators: [leaseEndGreaterThanStartValidator] }
    );
  }

  submit(): void {
    const submitData: Post = { ...this.form.value, location: this.locationObj };
    console.log(submitData);
    // TODO: dispatch action to store to create group from form information and add current logged in user as owner
  }

  showPicker(dateInputElement: any) {
    // Can't use the HTMLInputElement type because TS does not support the 'showPicker' function yet
    // But this is supported on all major browsers so we're safe to use https://caniuse.com/mdn-api_htmlinputelement_showpicker
    dateInputElement.showPicker();
  }

  handleLocation(location: Location) {
    this.locationObj = location;
    this.form.patchValue({
      location: location.placeName,
    });
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

  get houseType() {
    return this.form.get('houseType')!;
  }

  get petsAllowed() {
    return this.form.get('petsAllowed')!;
  }

  get location() {
    return this.form.get('location')!;
  }
}
