import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddingDetailsComponent } from './adding-details/adding-details.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'dashboard',
    pathMatch : 'full'
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'addingdetail',
    component : AddingDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddingUserRoutingModule { }
