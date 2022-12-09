import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpEventType} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../Services/busy.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(req).pipe(
      tap(event => {
        this.busyService.loader.next(true);
        if (event.type == HttpEventType.Response) {
          if (event.status == 200) {
            this.busyService.loader.next(false);
          }
        }
      })
    );
  }

}
