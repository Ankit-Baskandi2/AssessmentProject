import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ForgetPasswodComponent } from './forget-passwod/forget-passwod.component';
import { EmailConformationComponent } from './email-conformation/email-conformation.component';
import { ResetOldPasswordComponent } from './reset-old-password/reset-old-password.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'signin',
    pathMatch : 'full'
  },
  {
    path : 'signin',
    component : SigninComponent
  },
  {
    path : 'forgotpassword',
    component : ForgetPasswodComponent
  },
  {
    path : 'emailconformaton',
    component : EmailConformationComponent
  },
  {
    path : 'resetoldpassword',
    component : ResetOldPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
