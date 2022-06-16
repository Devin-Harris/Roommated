import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';

@Component({
  selector: 'create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss'],
})
export class CreateGroupFormComponent {
  form: FormGroup;

  readonly genderOptions = Object.keys(Gender);

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      showOnPosts: new FormControl(true, Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  setShowOnPosts(value: boolean) {
    this.form.controls['showOnPosts'].setValue(value);
  }

  createGroup(): void {
    // TODO: dispatch action to store to create group from form information and add current logged in user as owner
  }
}
