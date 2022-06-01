import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MyGroupPageComponent } from './pages/my-group-page/my-group-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SavedPageComponent } from './pages/saved-page/saved-page.component';
import { SignInPageComponent } from './pages/signin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'signin',
    component: SignInPageComponent,
  },
  {
    path: 'signup',
    component: SignUpPageComponent,
  },
  {
    path: 'map',
    component: MapPageComponent,
  },
  {
    path: 'my-group',
    component: MyGroupPageComponent,
  },
  {
    path: 'saved',
    component: SavedPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
