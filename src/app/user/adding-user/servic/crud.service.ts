import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  changeUserDetail(userDetail: any) {
    this.userDetailSubject.next(userDetail);
  }

  getAllUser() : Observable<any> {
    this.LoaderService.show();
    return this.http.get('https://localhost:7200/api/UserDetail/GetUserDetails').pipe(finalize(() => {this.LoaderService.hide();}))
  }

  saveUserDetails(data : any) : Observable<any> {
    this.LoaderService.show();
    return this.http.post('https://localhost:7200/api/UserDetail/SaveUserDetail',data).pipe
    (finalize(() => {this.LoaderService.hide();}));
  }

  deActivateUserAccount(i : number) : Observable<any> {
    this.LoaderService.show();
    return this.http.delete(`https://localhost:7200/api/UserDetail/DeleteUserDetails?Id=${i}`).pipe(finalize(() => { this.LoaderService.hide();}));
  }

  updateUserDetail(data : any) : Observable<any> {
    this.LoaderService.show();
    return this.http.put('https://localhost:7200/api/UserDetail/UpdateUserDetail',data).pipe(finalize(() => {this.LoaderService.hide();}));
  }

  changeLogedInUserPassword(data : any) : Observable<any> {
    const header : HttpHeaders = new HttpHeaders({Authorization : `Bearer ${localStorage.getItem('token')}`})
    this.LoaderService.show();
    return this.http.post('https://localhost:7200/api/UserDetail/ChangePassword',data,{headers : header}).pipe(finalize(() => {this.LoaderService.hide();}))
  }

  getDataThroughPagination(paginationParam : any) {
    this.LoaderService.show();
    return this.http.post('https://localhost:7200/api/UserDetail/GetDataAccordinToPaginarion',paginationParam).pipe(finalize(() => {this.LoaderService.hide();}));
  }
}
