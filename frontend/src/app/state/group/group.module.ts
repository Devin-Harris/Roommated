import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GroupEffects } from './group.effects';
import { GroupService } from './group.service';

@NgModule({
  imports: [EffectsModule.forFeature([GroupEffects]), HttpClientModule],
  providers: [GroupService],
})
export class GroupModule {}
