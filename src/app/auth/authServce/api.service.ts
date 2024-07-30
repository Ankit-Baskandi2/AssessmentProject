import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  siginUser(data : any) : Observable<any> {
    return this.http.post('https://localhost:7200/api/UserDetail/UserLoginChecking',data);
  }

  sendEmailToForgotPassword(data : any) : Observable<any> {
    return this.http.post('https://localhost:7200/api/UserDetail/SendEmailToForgotPassword/'+data,data)
  }

  resetOldPassword(data : any,token : any) : Observable<any> {
    const header : HttpHeaders = new HttpHeaders({Authorization : `Bearer ${token}`})
    return this.http.post('https://localhost:7200/api/UserDetail/ResetUserPassword',data,{headers : header})
  }
}
