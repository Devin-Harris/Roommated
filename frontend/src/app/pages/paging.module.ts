import { NgModule } from '@angular/core';
import { HomePageModule } from './home-page/home-page.module';
import { MapPageModule } from './map-page/map-page.module';
import { MyGroupPageComponent } from './my-group-page/my-group-page.component';
import { MyGroupPageModule } from './my-group-page/my-group-page.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { SavedPageModule } from './saved-page/saved-page.module';
import { SignInPageModule } from './signin-page/signin-page.module';
import { SignUpPageModule } from './signup-page/signup-page.module';

@NgModule({
  imports: [
    HomePageModule,
    MapPageModule,
    MyGroupPageModule,
    PageNotFoundModule,
    ProfilePageModule,
    SavedPageModule,
    SignInPageModule,
    SignUpPageModule,
  ],
})
export class PagingModule {}
