import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/loaderCompAndServ/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient, private loader : LoaderService) { }

  siginUser(data : any) : Observable<any> {
    this.loader.show();
    return this.http.post('https://localhost:7200/api/UserDetail/UserLoginChecking',data).pipe(finalize(() => {
      this.loader.hide();
    }));
  }

  sendEmailToForgotPassword(data : any) : Observable<any> {
    this.loader.show();
    return this.http.post('https://localhost:7200/api/UserDetail/SendEmailToForgotPassword/'+data,data).pipe(finalize(() => {
      this.loader.hide();
    }))
  }

  resetOldPassword(data : any,token : any) : Observable<any> {
    this.loader.show();
    const header : HttpHeaders = new HttpHeaders({Authorization : `Bearer ${token}`})
    return this.http.post('https://localhost:7200/api/UserDetail/ResetUserPassword',data,{headers : header}).pipe(finalize(() => {
      this.loader.hide();
    }))
  }
}
