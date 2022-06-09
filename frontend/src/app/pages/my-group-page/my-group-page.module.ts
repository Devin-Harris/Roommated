import { NgModule } from '@angular/core';
import { SidebarSliderModule } from 'src/app/components/sidebar-slider/sidebar-slider.module';
import { MyGroupPageComponent } from './my-group-page.component';

@NgModule({
  declarations: [MyGroupPageComponent],
  imports: [SidebarSliderModule],
})
export class MyGroupPageModule {}
