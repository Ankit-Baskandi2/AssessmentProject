import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../authServce/api.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValiator } from 'src/app/shared/Confirmed.Validator';

@Component({
  selector: 'app-reset-old-password',
  templateUrl: './reset-old-password.component.html',
  styleUrls: ['./reset-old-password.component.scss']
})
export class ResetOldPasswordComponent implements OnInit {

  eyeOpen : boolean = false;

  constructor(private fb : FormBuilder, private acitvatedRoute : ActivatedRoute, private api : ApiService, private toaster : ToastrService) {}

  ngOnInit(): void { }

  resetPassword = this.fb.group({
    password : ['',[Validators.required]],
    confirmPassword : ['',[Validators.required]]
  },
  { validators : ConfirmedValiator('password', 'confirmPassword') });

  get f() {
    return this.resetPassword.controls;
  }

  togglePasswordVisibility() {
    this.eyeOpen = !this.eyeOpen;
  }

  onSubmit() {
    if(this.resetPassword.valid) {
      const formValue = {...this.resetPassword.value}
      delete formValue.confirmPassword;
  
      const token = this.acitvatedRoute.snapshot.params['token'];

      this.api.resetOldPassword(formValue,token).subscribe({
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
