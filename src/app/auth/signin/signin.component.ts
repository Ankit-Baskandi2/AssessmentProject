import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../authServce/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  eyeOpen : boolean = false
  ngOnInit(): void { }

  constructor(private fb : FormBuilder, private api : ApiService, private toaster : ToastrService,private route : Router) {}

  loginDetail = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required]]
  })

  getControl(name: any): AbstractControl | null {
    return this.loginDetail.get(name);
  }

  togglePasswordVisibility() {
    this.eyeOpen = !this.eyeOpen;
  }

  onSubmit() {
    if(this.loginDetail.valid) {
      this.api.siginUser(this.loginDetail.value).subscribe(
        {next : (res : any) => {
          if(res.statusCode === 200) {
            this.toaster.success('success',res.message);
            localStorage.setItem('Bearer',res.data);
            this.route.navigate(['user/addinguser/addinguser/dashboard'])
          }
        },
        error: (res : any) => {
          if(res.StatusCode === 401) {
            this.toaster.error('error',res.message);
          }
          this.toaster.error('error','Something went wrong')
          this.loginDetail.reset();
        }}
      )
    }
    else {
      this.loginDetail.markAllAsTouched();
    }
  }
}
