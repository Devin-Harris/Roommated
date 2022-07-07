import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './map.effects';
import { MapService } from './map.service';

@NgModule({
  imports: [EffectsModule.forFeature([MapEffects]), HttpClientModule],
  providers: [MapService],
})
export class MapModule {}
