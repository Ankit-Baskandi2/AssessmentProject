import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswodComponent } from './forget-passwod/forget-passwod.component';
import { EmailConformationComponent } from './email-conformation/email-conformation.component';


@NgModule({
  declarations: [
    SigninComponent,
    ForgetPasswodComponent,
    EmailConformationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }