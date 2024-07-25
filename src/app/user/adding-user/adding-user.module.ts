import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddingUserRoutingModule } from './adding-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AddingUserRoutingModule
  ]
})
export class AddingUserModule { }
