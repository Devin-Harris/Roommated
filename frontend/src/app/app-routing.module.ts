import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './guards/authorization-guard.guard';
import { GroupInfoPageComponent } from './pages/group-info-page/group-info-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageModule } from './pages/home-page/home-page.module';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MyGroupPageComponent } from './pages/my-group-page/my-group-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PagingModule } from './pages/paging.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SavedPageComponent } from './pages/saved-page/saved-page.component';
import { SignInPageComponent } from './pages/signin-page/signin-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'signin',
    component: SignInPageComponent,
    loadChildren: () =>
      import('./pages/signin-page/signin-page.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'signup',
    component: SignUpPageComponent,
    loadChildren: () =>
      import('./pages/signup-page/signup-page.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'map',
    component: MapPageComponent,
    loadChildren: () => import('./pages/map-page/map-page.module').then((m) => m.MapPageModule),
  },
  {
    path: 'my-group',
    component: MyGroupPageComponent,
    canActivate: [AuthorizeGuard],
    loadChildren: () =>
      import('./pages/my-group-page/my-group-page.module').then((m) => m.MyGroupPageModule),
  },
  {
    path: 'group/:id',
    component: GroupInfoPageComponent,
    loadChildren: () =>
      import('./pages/group-info-page/group-info-page.module').then((m) => m.GroupInfoPageModule),
  },
  {
    path: 'saved',
    component: SavedPageComponent,
    loadChildren: () =>
      import('./pages/saved-page/saved-page.module').then((m) => m.SavedPageModule),
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    loadChildren: () =>
      import('./pages/profile-page/profile-page.module').then((m) => m.ProfilePageModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
