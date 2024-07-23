import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-passwod',
  templateUrl: './forget-passwod.component.html',
  styleUrls: ['./forget-passwod.component.scss']
})
export class ForgetPasswodComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private fb : FormBuilder) {}

  forgetDetails = this.fb.group({
    email : ['',[Validators.required, Validators.email]]
  })

  getControl(name : any) : AbstractControl | null {
    return this.forgetDetails.get(name);
  }

  onSubmit() {
    if(this.forgetDetails.valid) {
      console.log(this.forgetDetails.value)
    }
    else {
      this.forgetDetails.markAllAsTouched();
    }
  }
}
