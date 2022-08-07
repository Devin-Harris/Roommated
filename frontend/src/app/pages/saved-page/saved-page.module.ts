import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionCardModule } from 'src/app/components/cards/action-card/action-card.module';
import { SavedPageComponent } from './saved-page.component';

@NgModule({
  declarations: [SavedPageComponent],
  imports: [CommonModule, ActionCardModule],
})
export class SavedPageModule {}
