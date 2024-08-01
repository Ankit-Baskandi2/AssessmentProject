import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddingUserRoutingModule } from './adding-user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddingDetailsComponent } from './adding-details/adding-details.component';
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddingDetailsComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AddingUserRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  exports:[]
})
export class AddingUserModule { }
