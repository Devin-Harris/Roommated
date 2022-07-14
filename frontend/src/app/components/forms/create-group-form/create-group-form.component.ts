import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Gender } from '@rmtd/common/enums';
import { createGroup } from 'src/app/state/group';

@Component({
  selector: 'create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss'],
})
export class CreateGroupFormComponent {
  form: UntypedFormGroup;

  readonly genderOptions = Object.keys(Gender);

  constructor(private fb: UntypedFormBuilder, private store: Store) {
    this.form = this.fb.group({
      showOnPosts: new UntypedFormControl(true, Validators.required),
      name: new UntypedFormControl('', Validators.required),
      gender: new UntypedFormControl('', Validators.required),
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
