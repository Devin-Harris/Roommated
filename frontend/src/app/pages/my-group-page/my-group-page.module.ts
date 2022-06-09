import { NgModule } from '@angular/core';
import { AccordionModule } from 'src/app/components/misc/accordion/accordion.module';
import { SidebarSliderModule } from 'src/app/components/misc/sidebar-slider/sidebar-slider.module';
import { MyGroupPageComponent } from './my-group-page.component';

@NgModule({
  declarations: [MyGroupPageComponent],
  imports: [SidebarSliderModule, AccordionModule],
})
export class MyGroupPageModule {}
