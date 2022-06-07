import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DialogService } from 'src/app/components/dialogs/base/dialog.service';
import { CreateGroupDialogModule } from 'src/app/components/dialogs/create-group-dialog/create-group-dialog.module';
import { ErrorDialogModule } from 'src/app/components/dialogs/error-dialog/error-dialog.module';
import { AuthenticationEffects } from './authentication.effects';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    EffectsModule.forRoot([AuthenticationEffects]),
    HttpClientModule,
    ErrorDialogModule,
    CreateGroupDialogModule,
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
