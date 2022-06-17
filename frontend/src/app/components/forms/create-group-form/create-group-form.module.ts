import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioSliderModule } from '../../toggles/radio-slider/radio-slider.module';
import { CreateGroupFormComponent } from './create-group-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RadioSliderModule],
  declarations: [CreateGroupFormComponent],
  exports: [CreateGroupFormComponent],
})
export class CreateGroupFormModule {}
