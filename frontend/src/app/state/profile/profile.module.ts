import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationInterceptor } from '../authentication/AuthenticationInterceptor.service';
import { ProfileEffects } from './profile.effects';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [EffectsModule.forFeature([ProfileEffects]), HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    ProfileService,
  ],
})
export class ProfileModule {}
