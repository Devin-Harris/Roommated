import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioSliderModule } from '../../toggles/radio-slider/radio-slider.module';
import { CreatePostFormComponent } from './create-post-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RadioSliderModule],
  declarations: [CreatePostFormComponent],
  exports: [CreatePostFormComponent],
})
export class CreatePostFormModule {}
