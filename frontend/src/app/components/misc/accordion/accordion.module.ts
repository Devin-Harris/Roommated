import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionComponent],
  exports: [AccordionComponent],
})
export class AccordionModule {}
