import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authguardGuard } from './shared/guard/authguard.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'auth',
    pathMatch : 'full'
  },
  {
    path : 'auth',
    loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate : [authguardGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
