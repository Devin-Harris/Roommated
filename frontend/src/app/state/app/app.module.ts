import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CreateGroupDialogModule } from 'src/app/components/dialogs/create-group-dialog/create-group-dialog.module';
import { ErrorDialogModule } from 'src/app/components/dialogs/error-dialog/error-dialog.module';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthenticationInterceptor } from '../authentication/AuthenticationInterceptor.service';
import { AppEffects } from './app.effects';

@NgModule({
  imports: [EffectsModule.forFeature([AppEffects]), AuthenticationModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    LocalStorageService,
  ],
})
export class AppStateModule {}
