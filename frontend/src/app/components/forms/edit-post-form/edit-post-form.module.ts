import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeocodeSearchInputModule } from '../../map/geocode-search-input/geocode-search-input.module';
import { RadioSliderModule } from '../../toggles/radio-slider/radio-slider.module';
import { EditPostFormComponent } from './edit-post-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioSliderModule,
    GeocodeSearchInputModule,
  ],
  declarations: [EditPostFormComponent],
  exports: [EditPostFormComponent],
})
export class EditPostFormModule {}
