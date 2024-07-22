import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor() {}

  ngOnInit(): void {}

  sideBarOpen = true;

  sidebarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
