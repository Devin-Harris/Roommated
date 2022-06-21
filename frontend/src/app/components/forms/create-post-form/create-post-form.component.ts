import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';

@Component({
  selector: 'create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss'],
})
export class CreatePostFormComponent {
  form: FormGroup;

  readonly genderOptions = Object.keys(Gender);

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      leaseStart: new FormControl('', Validators.required),
      leaseEnd: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  createGroup(): void {
    console.log(this.form);
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
}
