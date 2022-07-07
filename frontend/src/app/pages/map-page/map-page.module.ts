import { NgModule } from '@angular/core';
import { MapPageComponent } from './map-page.component';
import { MapModule } from '../../components/map/map.module';
import { MapFilterModule } from 'src/app/components/map/map-filter/map-filter.module';

@NgModule({
  declarations: [MapPageComponent],
  imports: [MapModule, MapFilterModule],
})
export class MapPageModule {}
