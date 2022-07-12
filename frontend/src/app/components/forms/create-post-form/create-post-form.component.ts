import { Component } from '@angular/core';
import { NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { CreatePostDto } from '@rmtd/common/dtos';
import { Housing, HousingType, Parking, ParkingType } from '@rmtd/common/enums';
import { Location, Post } from '@rmtd/common/interfaces';
import { ControlsOf } from 'src/app/types';

const PARKING_TYPES = [
  { name: Parking.Garage, value: Parking.Garage, label: 'House Garage' },
  { name: Parking.OnStreet, value: Parking.OnStreet, label: 'On street' },
  { name: Parking.Paid, value: Parking.Paid, label: 'Paid parking lot' },
];

const HOUSE_TYPES = [
  { name: Housing.Apartment, value: Housing.Apartment, label: 'Apartment' },
  { name: Housing.House, value: Housing.House, label: 'House' },
];

const leaseEndGreaterThanStartValidator: ValidatorFn = (control) => {
  const start = control.get('leaseStart')?.value as string;
  const end = control.get('leaseEnd')?.value as string;

  return start && end && start >= end
    ? { illogicalLeaseDates: 'Lease end must be greater than least start' }
    : null;
};

// The nested Location field is kinda hard to ensure full type safety
// So I reduced it to only a string. We can validate type using the Dto and a separate `locationObj` later when submit
type PostFormFields = Omit<Post, 'groupId' | 'location'> & { location: string };

@Component({
  selector: 'create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent {
  form = this.fb.group<ControlsOf<PostFormFields>>(
    {
      leaseStart: this.fb.control('', [Validators.required]),
      leaseEnd: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      houseType: this.fb.control<HousingType>('apartment', [Validators.required]),
      parkingType: this.fb.control<ParkingType>('garage', [Validators.required]),
      petsAllowed: this.fb.control(false, [Validators.required]),
      location: this.fb.control('', [Validators.required]),
    },
    { validators: [leaseEndGreaterThanStartValidator] }
  );
  parkingRadios = PARKING_TYPES;
  houseRadios = HOUSE_TYPES;
  locationObj!: Location;

  constructor(private fb: NonNullableFormBuilder) {}

  submit(): void {
    const formValue = this.form.value as Required<typeof this.form.value>;
    const submitData: CreatePostDto = {
      ...formValue,
      location: this.locationObj,
    };
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
    // Patch the value of the "location" field so Validator.required is passed
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
