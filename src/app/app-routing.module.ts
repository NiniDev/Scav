import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/user/register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'more-info',
    loadChildren: () => import('./pages/user/more-info/more-info.module').then( m => m.MoreInfoPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
