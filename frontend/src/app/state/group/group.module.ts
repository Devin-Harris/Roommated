import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationInterceptor } from '../authentication/AuthenticationInterceptor.service';
import { GroupEffects } from './group.effects';
import { GroupService } from './group.service';

@NgModule({
  imports: [EffectsModule.forFeature([GroupEffects]), HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    GroupService,
  ],
})
export class GroupModule {}
