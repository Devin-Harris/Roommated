import { NgModule } from '@angular/core';
import { MapPageComponent } from './map-page.component';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [MapPageComponent],
  imports: [MapModule],
})
export class MapPageModule {}
