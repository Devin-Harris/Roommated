import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GeocodeSearchInputModule } from './geocode-search-input/geocode-search-input.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, NgxMapboxGLModule, GeocodeSearchInputModule],
  exports: [MapComponent],
})
export class MapModule {}
