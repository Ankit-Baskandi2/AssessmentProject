import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CrudService } from '../servic/crud.service';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  constructor(private api : CrudService,private toaster : ToastrService,private dialog : MatDialog, private router : Router){}

  userDetails : any;
  activeUser : number = 0;
  inActiveUser : number = 0;
  subscription : any;
  fileName = "User_Details.xlsx";

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.subscription = this.api.getAllUser().subscribe(
      {
        next : (res : any) => {
          if(res.statusCode === 200) {
            this.userDetails = res.data;
            let active = this.userDetails.filter((user : any) => user.isActive);
            let inActive = this.userDetails.filter((user : any) => !user.isActive);
            this.activeUser = active.length;
            this.inActiveUser = inActive.length;
          }
        }
      }
    );
  }

  exportToExcel() {
    let data = document.getElementById("tblData");
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb,this.fileName)
  }

  deleteUserInfo(i : number) {

    let dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.api.deActivateUserAccount(i).subscribe({
          next : (res) => {
            if(res.statusCode === 200) {
              this.toaster.success('Success', res.message);
            }
          },
    
          error : (res) => {
            if(res.statusCode === 401) {
              this.toaster.error('Error', res.message);
            }
          }
        })
      }
    })
  }

  editUserDetail(userDetail : any) {
    this.api.changeUserDetail(userDetail);
    this.router.navigate(['/user/addingmodule/addinguser/addingdetail']);
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
