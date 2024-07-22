import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ForgetPasswodComponent } from './forget-passwod/forget-passwod.component';
import { EmailConformationComponent } from './email-conformation/email-conformation.component';

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
    path : 'forgetpassword',
    component : ForgetPasswodComponent
  },
  {
    path : 'emailconformaton',
    component : EmailConformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
