import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../../../User/user/Services/account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private accountService:AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const accessToken = this.accountService.gettoken();

    debugger;
    if (accessToken) {
      request = request.clone({
         headers:request.headers.set('Authorization',`Bearer ${accessToken}`)
      });
   }
    
    return next.handle(request);

    
    
  }
}
