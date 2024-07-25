import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'addinguser',
    pathMatch : 'full'
  },
  {
    path : 'addinguser',
    component : UserComponent,
    children : [
      { 
        path : '',
        redirectTo : 'addinguser',
        pathMatch : 'full'
      },
      {
        path : 'addinguser',
        loadChildren : () => import('./adding-user/adding-user.module').then(m => m.AddingUserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
