import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adding-details',
  templateUrl: './adding-details.component.html',
  styleUrls: ['./adding-details.component.scss']
})
export class AddingDetailsComponent implements OnInit {
  dateNow : any;
  constructor() {}

  ngOnInit(): void {
    this.dateNow = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  disableDate() {
    return false;
  }

  dateValidation(event : any) : boolean {
    return event.charCode >= 48 && event.charCode <= 57
  }

  blockSpaceValidaton(event : any) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 61 && event.charCode <= 122
  }
}
