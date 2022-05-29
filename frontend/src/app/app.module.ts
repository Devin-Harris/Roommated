import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { reducers, metaReducers } from './state';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
