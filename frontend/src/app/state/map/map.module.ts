import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationInterceptor } from '../authentication/AuthenticationInterceptor.service';
import { MapEffects } from './map.effects';
import { MapService } from './map.service';

@NgModule({
  imports: [EffectsModule.forFeature([MapEffects]), HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    MapService,
  ],
})
export class MapModule {}
