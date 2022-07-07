import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GeocodeSearchInputModule } from './geocode-search-input/geocode-search-input.module';
import { MapComponent } from './map.component';
import { MapModule as MapStateModule } from './../../state/map/map.module';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, NgxMapboxGLModule, GeocodeSearchInputModule, MapStateModule],
  exports: [MapComponent],
})
export class MapModule {}
