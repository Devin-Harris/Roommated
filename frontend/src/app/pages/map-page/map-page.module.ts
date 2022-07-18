import { NgModule } from '@angular/core';
import { MapPageComponent } from './map-page.component';
import { MapModule } from '../../components/map/map.module';
import { MapFilterModule } from 'src/app/components/map/map-filter/map-filter.module';
import { PostSidebarModule } from 'src/app/components/sidebar-slider/post-sidebar/post-sidebar.module';

@NgModule({
  declarations: [MapPageComponent],
  imports: [MapModule, MapFilterModule, PostSidebarModule],
})
export class MapPageModule {}
