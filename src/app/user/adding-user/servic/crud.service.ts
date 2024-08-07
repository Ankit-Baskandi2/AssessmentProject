import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/loaderCompAndServ/loader.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private userDetailSubject = new BehaviorSubject<any>(null);
  currentUserDetail = this.userDetailSubject.asObservable();

  constructor(private http : HttpClient, private LoaderService : LoaderService) { }

  localHostString = 'https://localhost:7200/api/UserDetail';

  changeUserDetail(userDetail: any) {
    this.userDetailSubject.next(userDetail);
  }

  getAllUser() : Observable<any> {
    this.LoaderService.show();
    return this.http.get(`${this.localHostString}/GetUserDetails`).pipe(finalize(() => {this.LoaderService.hide();}))
  }

  saveUserDetails(data : any) : Observable<any> {
    this.LoaderService.show();
    return this.http.post(`${this.localHostString}/SaveUserDetail`,data).pipe
    (finalize(() => {this.LoaderService.hide();}));
  }

  deActivateUserAccount(i : number) : Observable<any> {
    this.LoaderService.show();
    return this.http.delete(`${this.localHostString}/DeleteUserDetails?Id=${i}`).pipe(finalize(() => { this.LoaderService.hide();}));
  }

  updateUserDetail(data : any) : Observable<any> {
    this.LoaderService.show();
    return this.http.put(`${this.localHostString}/UpdateUserDetail`,data).pipe(finalize(() => {this.LoaderService.hide();}));
  }

  changeLogedInUserPassword(data : any) : Observable<any> {
    //const header : HttpHeaders = new HttpHeaders({Authorization : `Bearer ${localStorage.getItem('token')}`})
    this.LoaderService.show();
    return this.http.post(`${this.localHostString}/ChangePassword`,data).pipe(finalize(() => {this.LoaderService.hide();}))
  }

  getDataThroughPagination(paginationParam : any) {
    this.LoaderService.show();
    return this.http.post(`${this.localHostString}/GetDataAccordinToPaginarion`,paginationParam).pipe(finalize(() => {this.LoaderService.hide();}));
  }
}
