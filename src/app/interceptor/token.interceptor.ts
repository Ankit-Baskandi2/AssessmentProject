import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private toaster : ToastrService, private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = localStorage.getItem('token');
    if(myToken) {
      request = request.clone({
        setHeaders : {Authorization : `Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.toaster.warning('Warning','Token is expired, Please login again');
            this.router.navigate(['auth/signin']);
          }
        }
        return throwError(() => new Error("Something went wrong"));
      })
    );
  }
}
