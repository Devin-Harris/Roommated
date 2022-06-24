import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [NgxMapboxGLModule],
  exports: [MapComponent],
})
export class MapModule {}
