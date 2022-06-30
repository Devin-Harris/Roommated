import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageStackComponent } from './image-stack/image-stack.component';
import { ImageStackModule } from './image-stack/image-stack.module';

@NgModule({
  imports: [CommonModule, ImageStackModule],
})
export class MiscModule {}
