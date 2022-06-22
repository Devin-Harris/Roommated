import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';

const PET_TYPES_CHECKBOXES = [
  { name: 'cat', value: 'cat', label: 'Cats' },
  { name: 'dog', value: 'dog', label: 'Dogs' },
  { name: 'none', value: '', label: 'No pets' },
];

export const petCheckboxValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const atLeastOneFieldTrue = PET_TYPES_CHECKBOXES.map((item) => item.name).some(
    (name) => control.get(name)!.value === true
  );

  // Either 'none' field is false or all other fields must be false (when 'none' is True)
  const allFieldsFalseWhenNoPet =
    control.get('none')!.value === false ||
    PET_TYPES_CHECKBOXES.slice(0, -1)
      .map((item) => item.name)
      .every((name) => control.get(name)!.value === false);

  if (!atLeastOneFieldTrue) {
    return { petIsRequired: 'At least one pet type is required' };
  }

  if (!allFieldsFalseWhenNoPet) {
    return { noPetViolation: 'Must not check other fields when "No pets" is checked' };
  }

  return null;
};

@Component({
  selector: 'create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent {
  form: FormGroup;
  petCheckboxes = PET_TYPES_CHECKBOXES;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      leaseStart: ['', Validators.required],
      leaseEnd: ['', Validators.required],
      description: [''],
      petTypes: this.fb.group({}),
    });

    // Dynamically add pet checkboxes into the `petTypes` group
    this.petCheckboxes.forEach((option) => {
      (this.form.get('petTypes') as FormGroup).addControl(option.name, new FormControl(false));
    });

    this.form.get('petTypes')?.setValidators([petCheckboxValidator]);

    console.log(this.form.value);
  }

  onCheckboxChange(e: Event) {
    let checkArray = this.form.get('petTypes') as FormArray;
    const elem = e.target as HTMLInputElement;
    if (elem.checked && elem.value === '') {
      // "None" pet options
      console.log('No pets');
      checkArray.clear();
      return;
    }
    // Else, for other types of pets
    if (elem.checked) {
      checkArray.push(new FormControl(elem.value));
    } else {
      checkArray.controls = checkArray.controls.filter(
        (item) => item.value == '' || item.value == elem.value
      );
    }
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

  get petTypes() {
    return this.form.get('petTypes')!;
  }
}
