import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './profile.effects';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [EffectsModule.forFeature([ProfileEffects]), HttpClientModule],
  providers: [ProfileService],
})
export class ProfileModule {}
