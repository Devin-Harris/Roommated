import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeocodeSearchInputModule } from '../../map/geocode-search-input/geocode-search-input.module';
import { RadioSliderModule } from '../../toggles/radio-slider/radio-slider.module';
import { CreatePostFormComponent } from './create-post-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioSliderModule,
    GeocodeSearchInputModule,
  ],
  declarations: [CreatePostFormComponent],
  exports: [CreatePostFormComponent],
})
export class CreatePostFormModule {}
