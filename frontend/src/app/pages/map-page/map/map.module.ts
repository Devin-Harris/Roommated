import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, NgxMapboxGLModule],
  exports: [MapComponent],
})
export class MapModule {}
