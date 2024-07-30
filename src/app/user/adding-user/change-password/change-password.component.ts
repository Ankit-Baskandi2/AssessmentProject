import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb : FormBuilder) {}

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

    }
    else {
      this.oldAndNewPasswordDetailForm.markAllAsTouched();
    }
  }
}
