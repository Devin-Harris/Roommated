import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageStackComponent } from './image-stack.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageStackComponent],
  exports: [ImageStackComponent],
})
export class ImageStackModule {}
