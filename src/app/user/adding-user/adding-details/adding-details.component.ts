import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../servic/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adding-details',
  templateUrl: './adding-details.component.html',
  styleUrls: ['./adding-details.component.scss']
})
export class AddingDetailsComponent implements OnInit {

  dateNow : any;
  isUpdate : boolean = false;
  uplaodFile : any = null;
  updateUserId : any;
  constructor(private fb : FormBuilder, private api : CrudService, private toaster : ToastrService, private router : Router) {}

  userRegisterationDetails : any;

  ngOnInit(): void {
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.userRegisterationDetails = this.fb.group({
      FirstName : ['',[Validators.required,Validators.maxLength(30)]],
      MiddleName : [''],
      LastName : ['',[Validators.required,Validators.maxLength(30)]],
      Dob : ['',[Validators.required]],
      DateOfjoining : [''],
      Gender : ['',[Validators.required]],
      Phone : ['',[Validators.required,Validators.maxLength(10)]],
      AlternatePhone : ['',[Validators.maxLength(10)]],
      Email : ['',[Validators.required, Validators.email]],
      imageSrc : [''],
      UserAddressAnkits : this.fb.array([this.addAddressDetailsFromGroup()])
    });

    this.api.currentUserDetail.subscribe(userDetail => {
      if (userDetail) {
        this.isUpdate = true;
        console.log(userDetail);
        this.userRegisterationDetails.patchValue({
          FirstName : userDetail.firstName,
          MiddleName : userDetail.middleName,
          LastName : userDetail.lastName,
          Dob : userDetail.dob,
          Email : userDetail.email,
          Phone : userDetail.phone,
          AlternatePhone : userDetail.alternatePhone,
          DateOfjoining : userDetail.dateOfjoining
        });

        this.uplaodFile = userDetail.imagePath;
        this.updateUserId = userDetail.userId

        const addressFormArray = this.userRegisterationDetails.get('UserAddressAnkits') as FormArray;
        addressFormArray.clear();
        userDetail.userAddressAnkits.forEach((element : any) => {
          addressFormArray.push(this.fb.group({
            Country: [element.country || '', Validators.required],
            State: [element.state || '', Validators.required],
            City: [element.city || '', Validators.required],
            ZipCode: [element.zipCode || '', Validators.required]
          }));
        });
      }
    });
  }

  addAddressDetailsFromGroup() : FormGroup {
    return this.fb.group({
      Country : ['',[Validators.required]],
      State : ['',[Validators.required]],
      City : ['',[Validators.required]],
      ZipCode : ['',[Validators.required]]
    })
  }

  addAddress() {
    (<FormArray>this.userRegisterationDetails.get('UserAddressAnkits')).push(this.addAddressDetailsFromGroup());
  }

  removeAddressFromFormArray(index : number) {
    (<FormArray>this.userRegisterationDetails.get('UserAddressAnkits')).removeAt(index);
  }

  dateValidation(event : any) : boolean {
    return event.charCode >= 48 && event.charCode <= 57
  }

  blockSpaceValidaton(event : any) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 61 && event.charCode <= 122
  }

  onSelectImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uplaodFile = input.files[0];
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.userRegisterationDetails.get('imageSrc')?.patchValue(result);
      };
  
      reader.readAsDataURL(file);
    }
  }

  disableDate() {
    return false;
  }

  getControl(name: any): AbstractControl | null {
    return this.userRegisterationDetails.get(name);
  }

  getAddressControl(index: number, controlName: string): AbstractControl | null {
    return (this.userRegisterationDetails.get('UserAddressAnkits') as FormArray).at(index).get(controlName);
  }

  onSave() {

    if(this.userRegisterationDetails.valid) {
      const formData: FormData = new FormData();
  
      formData.append('FirstName', this.userRegisterationDetails.value.FirstName);
      formData.append('MiddleName', this.userRegisterationDetails.value.MiddleName);
      formData.append('LastName', this.userRegisterationDetails.value.LastName);
      formData.append('Dob', this.userRegisterationDetails.value.Dob);
      formData.append('DateOfjoining', this.userRegisterationDetails.value.DateOfjoining);
      formData.append('Gender', this.userRegisterationDetails.value.Gender);
      formData.append('Phone', this.userRegisterationDetails.value.Phone);
      formData.append('Email', this.userRegisterationDetails.value.Email);
      formData.append('AlternatePhone', this.userRegisterationDetails.value.AlternatePhone);
      formData.append('ImagePath', this.uplaodFile);
    
      const userAddressAnkits = this.userRegisterationDetails.get('UserAddressAnkits').value;
      userAddressAnkits.forEach((address: any, i: number) => {
        formData.append(`UserAddressAnkits[${i}].City`, address.City);
        formData.append(`UserAddressAnkits[${i}].State`, address.State);
        formData.append(`UserAddressAnkits[${i}].Country`, address.Country);
        formData.append(`UserAddressAnkits[${i}].ZipCode`, address.ZipCode);
      });
    
      this.api.saveUserDetails(formData).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.toaster.success('Success',res.message);
            this.router.navigate(['/user/addingmodule/addinguser/dashboard'])
          }
        },
        error: (res) => {
          if(res.statusCode === 401) {
            this.toaster.error('Error', res.message);
            return;
          }
          this.toaster.error('Error', "Something went wrong");
        }
      });
    }
    else {
      this.userRegisterationDetails.markAllAsTouched();
    }


    this.userRegisterationDetails
  }

  onUpdate() {
    const formData: FormData = new FormData();

    formData.append('Id', this.updateUserId);
    formData.append('FirstName', this.userRegisterationDetails.value.FirstName);
    formData.append('MiddleName', this.userRegisterationDetails.value.MiddleName);
    formData.append('LastName', this.userRegisterationDetails.value.LastName);
    formData.append('Dob', this.userRegisterationDetails.value.Dob);
    formData.append('DateOfjoining', this.userRegisterationDetails.value.DateOfjoining);
    formData.append('Gender', this.userRegisterationDetails.value.Gender);
    formData.append('Phone', this.userRegisterationDetails.value.Phone);
    formData.append('Email', this.userRegisterationDetails.value.Email);
    formData.append('AlternatePhone', this.userRegisterationDetails.value.AlternatePhone);
    formData.append('ImagePath', this.uplaodFile);
  
    const userAddressAnkits = this.userRegisterationDetails.get('UserAddressAnkits').value;
    userAddressAnkits.forEach((address: any, i: number) => {
      formData.append(`UserAddressAnkits[${i}].City`, address.City);
      formData.append(`UserAddressAnkits[${i}].State`, address.State);
      formData.append(`UserAddressAnkits[${i}].Country`, address.Country);
      formData.append(`UserAddressAnkits[${i}].ZipCode`, address.ZipCode);
    });

    this.api.updateUserDetail(formData).subscribe({
      next : (res) => {
        if(res.statusCode === 200) {
          this.toaster.success('Success',res.message);
        }
      },
      error : (res) => {
        if(res.statusCode === 401) {
          this.toaster.success('Error', res.message);
        }
        this.toaster.success('Error', 'Something went wrong while updating');
      }
    })

    formData.forEach((value, key) => {
      console.log(key, value);
    });
  }

}
