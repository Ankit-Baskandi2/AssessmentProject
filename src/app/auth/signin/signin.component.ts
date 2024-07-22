import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  eyeOpen : boolean = false
  ngOnInit(): void { }

  constructor(private fb : FormBuilder) {}

  loginDetail = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
  })

  getControl(name: any): AbstractControl | null {
    return this.loginDetail.get(name);
  }

  togglePasswordVisibility() {
    this.eyeOpen = !this.eyeOpen;
  }

  onSubmit() {
    if(this.loginDetail.valid) {

    }
    else {
      this.loginDetail.markAllAsTouched();
    }
  }
}
