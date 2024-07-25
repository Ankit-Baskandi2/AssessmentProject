import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../authServce/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-passwod',
  templateUrl: './forget-passwod.component.html',
  styleUrls: ['./forget-passwod.component.scss']
})
export class ForgetPasswodComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private fb : FormBuilder,private apiService : ApiService, private router : Router,private toaster : ToastrService) {}

  forgetDetails = this.fb.group({
    email : ['',[Validators.required, Validators.email]]
  })

  getControl(name : any) : AbstractControl | null {
    return this.forgetDetails.get(name);
  }

  onSubmit() {
    if(this.forgetDetails.valid) {
      this.apiService.sendEmailToForgotPassword(this.forgetDetails.value.email).subscribe(
        {next : (res) => {
          if(res.statusCode === 200) {
            this.toaster.success('Success', res.message);
            this.router.navigate(['auth/emailconformaton']);
          }
        },
        error : (res) => {
          if(res.statusCode === 401) {
            this.toaster.error('Error', res.message)
          }
        }
      })
    }
    else {
      this.forgetDetails.markAllAsTouched();
    }
  }
}
