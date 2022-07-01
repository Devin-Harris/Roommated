import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeocodeSearchInputComponent } from './geocode-search-input.component';

@NgModule({
  declarations: [GeocodeSearchInputComponent],
  imports: [CommonModule],
  exports: [GeocodeSearchInputComponent],
})
export class GeocodeSearchInputModule {}
