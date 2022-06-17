import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionCardComponent } from './action-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ActionCardComponent],
  exports: [ActionCardComponent],
})
export class ActionCardModule {}
