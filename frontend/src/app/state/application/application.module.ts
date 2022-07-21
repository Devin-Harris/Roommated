import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationInterceptor } from '../authentication/AuthenticationInterceptor.service';
import { ApplicationEffects } from './application.effects';
import { ApplicationService } from './application.service';

@NgModule({
  imports: [EffectsModule.forFeature([ApplicationEffects]), HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    ApplicationService,
  ],
})
export class ApplicationModule {}
