import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-old-password',
  templateUrl: './reset-old-password.component.html',
  styleUrls: ['./reset-old-password.component.scss']
})
export class ResetOldPasswordComponent implements OnInit {

  constructor(private fb : FormBuilder) {}

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
    if(this.resetPassword.valid) {

    }else {
      this.resetPassword.markAllAsTouched();
    }
  }
}
