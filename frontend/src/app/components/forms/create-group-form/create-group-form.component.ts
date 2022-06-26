import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';
import { createGroup } from 'src/app/state/group';

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

  submitForm(): void {
    this.store.dispatch(
      createGroup({
        group: {
          showOnPosts: this.form.get('showOnPosts')?.value,
          name: this.form.get('name')?.value,
          gender: this.form.get('gender')?.value,
        },
      })
    );
  }
}
