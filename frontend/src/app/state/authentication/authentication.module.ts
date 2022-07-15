import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DialogService } from 'src/app/components/dialogs/base/dialog.service';
import { CreateGroupDialogModule } from 'src/app/components/dialogs/create-group-dialog/create-group-dialog.module';
import { ErrorDialogModule } from 'src/app/components/dialogs/error-dialog/error-dialog.module';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthenticationEffects } from './authentication.effects';
import { AuthenticationService } from './authentication.service';
import { AuthenticationInterceptor } from './AuthenticationInterceptor.service';

@NgModule({
  imports: [
    EffectsModule.forFeature([AuthenticationEffects]),
    HttpClientModule,
    ErrorDialogModule,
    CreateGroupDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    AuthenticationService,
    LocalStorageService,
  ],
})
export class AuthenticationModule {}
