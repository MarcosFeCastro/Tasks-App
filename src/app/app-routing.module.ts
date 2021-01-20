import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule ) },
  { path: 'home', canActivate: [ AuthGuard ], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule ) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'notFound', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
