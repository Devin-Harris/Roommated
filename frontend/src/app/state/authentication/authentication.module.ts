import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { AuthenticationEffects } from "./authentication.effects";
import { AuthenticationService } from "./authentication.service";

@NgModule({
  imports: [
    EffectsModule.forRoot([AuthenticationEffects]),
    HttpClientModule
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}