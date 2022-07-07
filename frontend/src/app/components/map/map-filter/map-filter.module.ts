import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../../misc/dropdown/dropdown.module';
import { MapFilterComponent } from './map-filter.component';

@NgModule({
  declarations: [MapFilterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
  exports: [MapFilterComponent],
})
export class MapFilterModule {}
