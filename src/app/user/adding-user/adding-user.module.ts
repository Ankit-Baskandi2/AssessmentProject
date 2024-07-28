import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddingUserRoutingModule } from './adding-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddingDetailsComponent } from './adding-details/adding-details.component';
import {MatIconModule} from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    AddingDetailsComponent
  ],
  imports: [
    CommonModule,
    AddingUserRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class AddingUserModule { }
