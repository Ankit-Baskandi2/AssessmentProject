import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../servic/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Country, State, City } from 'country-state-city'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adding-details',
  templateUrl: './adding-details.component.html',
  styleUrls: ['./adding-details.component.scss']
})
export class AddingDetailsComponent implements OnInit, OnDestroy {

  dateNow: any;
  isUpdate: boolean = false;
  uplaodFile: any = null;
  updateUserId: any;
  countryList: any;
  countryCode: any;
  stateListBasedOnCountryCode: any;
  cityListBasedOnStateCode: any;
  userDetailSubscription!: Subscription;

  constructor(private fb: FormBuilder, private crudService: CrudService, private toaster: ToastrService, private router: Router) { }

  userRegisterationDetails: any;

  ngOnInit(): void {
    this.countryList = Country.getAllCountries();
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.userRegisterationDetails = this.fb.group({
      FirstName: ['', [Validators.required, Validators.maxLength(30)]],
      MiddleName: [''],
      LastName: ['', [Validators.required, Validators.maxLength(30)]],
      Dob: ['', [Validators.required]],
      DateOfjoining: [''],
      Gender: ['', [Validators.required]],
      Phone: ['', [Validators.required, Validators.maxLength(10)]],
      AlternatePhone: ['', [Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email]],
      imageSrc: [''],
      UserAddressAnkits: this.fb.array([this.addAddressDetailsFromGroup()])
    });

    this.userDetailSubscription = this.crudService.currentUserDetail.subscribe(userDetail => {
      if (userDetail) {
        this.isUpdate = true;
        this.userRegisterationDetails.patchValue({
          FirstName: userDetail.firstName,
          MiddleName: userDetail.middleName,
          LastName: userDetail.lastName,
          Dob: userDetail.dob,
          Email: userDetail.email,
          Gender: userDetail.gender,
          Phone: userDetail.phone,
          AlternatePhone: userDetail.alternatePhone,
          DateOfjoining: userDetail.dateOfjoining
        });

        this.uplaodFile = userDetail.imagePath;
        this.updateUserId = userDetail.userId;
        this.userRegisterationDetails.get('imageSrc')?.patchValue(`https://localhost:7200${userDetail.imagePath}`);

        const addressFormArray = this.userRegisterationDetails.get('UserAddressAnkits') as FormArray;
        addressFormArray.clear();

        userDetail.userAddressAnkits.forEach((element: any) => {

          this.stateListBasedOnCountryCode = State.getStatesOfCountry(element.country);
          this.cityListBasedOnStateCode = City.getCitiesOfState(element.country, element.state);

          addressFormArray.push(this.fb.group({
            Country: [element.country],
            State: [element.state],
            City: [element.city],
            ZipCode: [element.zipCode]
          }));
        });
      }
    });
  }

  addAddressDetailsFromGroup(): FormGroup {
    return this.fb.group({
      Country: ['', [Validators.required]],
      State: ['', [Validators.required]],
      City: ['', [Validators.required]],
      ZipCode: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]]
    });
  }

  addAddress() {
    const addressFormArray = (<FormArray>this.userRegisterationDetails.get('UserAddressAnkits'))
    if (addressFormArray.length < 2) {
      addressFormArray.push(this.addAddressDetailsFromGroup());
    }
  }

  removeAddressFromFormArray(index: number) {
    (<FormArray>this.userRegisterationDetails.get('UserAddressAnkits')).removeAt(index);
  }

  dateValidation(event: any): boolean {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  blockSpaceValidaton(event: any) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 61 && event.charCode <= 122;
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
    if (this.userRegisterationDetails.valid) {
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

      this.userRegisterationDetails.reset();

      this.crudService.saveUserDetails(formData).subscribe({
        next: (res) => {
          if (res.statusCode === 200) {
            this.toaster.success('Success', res.message);
            this.router.navigate(['/user/addingmodule/addinguser/dashboard']);
          }
        },
        error: (res) => {
          if (res.statusCode === 401) {
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

    const userAddressAnkits = this.userRegisterationDetails.get('UserAddressAnkits').value;
    userAddressAnkits.forEach((address: any, i: number) => {
      formData.append(`UserAddressAnkits[${i}].City`, address.City);
      formData.append(`UserAddressAnkits[${i}].State`, address.State);
      formData.append(`UserAddressAnkits[${i}].Country`, address.Country);
      formData.append(`UserAddressAnkits[${i}].ZipCode`, address.ZipCode);
    });

    const imagePath = this.userRegisterationDetails.value.imageSrc;

    if (imagePath) {
      this.convertImageToFile(imagePath).then((file) => {
        formData.append('ImagePath', file);
        this.submitUpdateForm(formData);
      }).catch((error) => {
        console.error('Error converting image:', error);
        this.toaster.error('Error', 'Something went wrong while processing the image');
      });
    } else {
      this.submitUpdateForm(formData);
    }
  }

  submitUpdateForm(formData: FormData) {
    this.crudService.updateUserDetail(formData).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.toaster.success('Success', res.message);
          this.userRegisterationDetails.reset();
          this.router.navigate(['/user/addingmodule/addinguser/dashboard']);
        }
      },
      error: (res) => {
        if (res.statusCode === 401) {
          this.toaster.error('Error', res.message);
        }
        this.toaster.error('Error', 'Something went wrong while updating');
      },
      complete: () => {
        this.userRegisterationDetails.reset();
      }
    });

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
  }


  convertImageToFile(dataUrl: string): Promise<File> {
    return fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const fileName = `image_${new Date().getTime()}.png`;
        return new File([blob], fileName, { type: blob.type });
      });
  }

  setCountryCode(event: any) {
    this.countryCode = event.target.value;
    this.stateListBasedOnCountryCode = State.getStatesOfCountry(this.countryCode);
  }

  setStateCode(event: any) {
    this.cityListBasedOnStateCode = City.getCitiesOfState(this.countryCode, event.target.value);
  }

  ngOnDestroy(): void {
    this.isUpdate = false;
    if (this.userDetailSubscription) {
      this.userDetailSubscription.unsubscribe();
    }
    location.reload();
  }
}
