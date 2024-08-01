import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  userName : any;

  constructor(private router : Router) {}
  
  ngOnInit(): void {
    this.userName = localStorage.getItem('name')
   }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  
  logOut() {
    localStorage.clear();
    this.router.navigate(['auth/signin']);
  }
}
