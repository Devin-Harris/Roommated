import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreatePostDto } from '@rmtd/common/dtos';
import { Housing, HousingType, Parking, ParkingType, PostState } from '@rmtd/common/enums';
import { Location, Post } from '@rmtd/common/interfaces';
import { createGroupPost } from 'src/app/state/group';
import { ControlsOf } from 'src/app/types';

const PARKING_TYPES = [
  { name: Parking.Garage, value: Parking.Garage, label: 'House Garage' },
  { name: Parking.OnStreet, value: Parking.OnStreet, label: 'On street' },
  { name: Parking.Paid, value: Parking.Paid, label: 'Paid parking lot' },
];

const HOUSE_TYPES = [
  { name: Housing.Apartment, value: Housing.Apartment, label: 'Apartment' },
  { name: Housing.House, value: Housing.House, label: 'House' },
  { name: Housing.Dorm, value: Housing.Dorm, label: 'Dorm' },
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
type PostFormFields = Omit<Post, 'groupId' | 'location' | 'state' | 'id'> & { location: string };

@Component({
  selector: 'edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.scss'],
})
export class EditPostFormComponent implements OnChanges {
  @Input('post') post: Post;

  form: FormGroup<ControlsOf<PostFormFields>>;

  parkingRadios = PARKING_TYPES;

  houseRadios = HOUSE_TYPES;

  locationObj!: Location;

  constructor(private fb: NonNullableFormBuilder, private store: Store) {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['post']) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    if (this.post) {
      console.log(this.post.location.placeName);
      this.form = this.fb.group<ControlsOf<PostFormFields>>(
        {
          leaseStart: this.fb.control(this.post.leaseStart, [Validators.required]),
          leaseEnd: this.fb.control(this.post.leaseEnd, [Validators.required]),
          description: this.fb.control(this.post.description),
          houseType: this.fb.control<HousingType>(this.post.houseType, [Validators.required]),
          parkingType: this.fb.control<ParkingType>(this.post.parkingType, [Validators.required]),
          petsAllowed: this.fb.control(this.post.petsAllowed, [Validators.required]),
          location: this.fb.control(this.post.location.placeName, [Validators.required]),
          rent: this.fb.control(this.post.rent, [Validators.required]),
        },
        { validators: [leaseEndGreaterThanStartValidator] }
      );
    }
  }

  submit(): void {
    const formValue = this.form.value as Required<typeof this.form.value>;
    const submitData: CreatePostDto = {
      ...formValue,
      location: this.locationObj,
      state: PostState.Searching,
    };
    this.store.dispatch(createGroupPost({ post: submitData }));
  }

  cancelChanges(): void {
    this.initializeForm();
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

  get rent() {
    return this.form.get('rent')!;
  }
}
