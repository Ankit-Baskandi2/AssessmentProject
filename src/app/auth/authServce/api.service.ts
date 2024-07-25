import { HttpClient } from '@angular/common/http';
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
}
