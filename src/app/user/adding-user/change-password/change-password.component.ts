import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../servic/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb : FormBuilder, private apiCallService : CrudService, private toaster : ToastrService) {}

  ngOnInit(): void { }

  oldAndNewPasswordDetailForm = this.fb.group({
    Password : ['',[Validators.required]],
    OldPassword : ['',[Validators.required]] 
  });

  getControl(name: any): AbstractControl | null {
    return this.oldAndNewPasswordDetailForm.get(name);
  }

  onSubmit() {
    if(this.oldAndNewPasswordDetailForm.valid) {
      this.apiCallService.changeLogedInUserPassword(this.oldAndNewPasswordDetailForm.value).subscribe({
        next : (res => {
          if(res.statusCode === 200) {
            this.toaster.success('Success',res.message);
            this.oldAndNewPasswordDetailForm.reset();
          }
        }),
        error : (res => {
          if(res.statusCode === 401) {
            this.toaster.error('Error',res.message);
          }
          this.toaster.error('Error','Something went wrong');
        })
      })
    }
    else {
      this.oldAndNewPasswordDetailForm.markAllAsTouched();
    }
  }
}
