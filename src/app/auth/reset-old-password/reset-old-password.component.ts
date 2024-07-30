import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../authServce/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-old-password',
  templateUrl: './reset-old-password.component.html',
  styleUrls: ['./reset-old-password.component.scss']
})
export class ResetOldPasswordComponent implements OnInit {

  constructor(private fb : FormBuilder, private acitvatedRoute : ActivatedRoute, private api : ApiService, private toaster : ToastrService) {}

  ngOnInit(): void { }

  resetPassword = this.fb.group({
    password : ['',[Validators.required]],
    confirmPassword : ['',[Validators.required]]
  },
  {Validators : this.ConfirmedValiator}
);

  getControl(name : any) : AbstractControl | null {
    return this.resetPassword.get(name);
  }

  ConfirmedValiator(controls : AbstractControl) {

      const pass = controls.get('password');
      const conformPass = controls.get('confirmPassword');

      const error = pass?.value !== conformPass?.value

      conformPass?.setErrors(error ? {error : true} : null)
      return error ? { mismatch: true } : null;
  }

  onSubmit() {
    debugger;
    if(this.resetPassword.valid) {
      const formValue = {...this.resetPassword.value}
      delete formValue.confirmPassword;
      let passData = formValue.passwod;
      console.log("The data type is : ",typeof passData);
      const token = this.acitvatedRoute.snapshot.params['token'];
      this.api.resetOldPassword(formValue.password,token).subscribe({
        next : (res) => {
          if(res.statusCode === 200) {
            this.toaster.success('Success',res.message);
          }
        },
        error : (res) => {
          if(res.statusCode === 401) {
            this.toaster.error('Error', res.message);
          }
          this.toaster.error('Error',"Something went wrong");
        }
      })
    }else {
      this.resetPassword.markAllAsTouched();
    }
  }
}
