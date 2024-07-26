import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddingUserRoutingModule } from './adding-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddingDetailsComponent } from './adding-details/adding-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddingDetailsComponent
  ],
  imports: [
    CommonModule,
    AddingUserRoutingModule
  ]
})
export class AddingUserModule { }
