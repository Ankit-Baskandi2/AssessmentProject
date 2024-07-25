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
);

  getControl(name : any) : AbstractControl | null {
    return this.resetPassword.get(name);
  }

  ConfirmedValiator(
    controlName: string,
    matchingControlName: string
  ) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if(this.resetPassword.valid) {

    }else {
      this.resetPassword.markAllAsTouched();
    }
  }
}
