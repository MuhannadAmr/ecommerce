import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  userToken: any = localStorage.getItem("userToken")
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userToken==null) {
      this.userToken = "";
    }else{
      this.userToken= localStorage.getItem("userToken");
    }
    let api = request.clone({
      headers: request.headers.set("token", this.userToken )
      // headers: request.headers.set("token" , "")
    })
    return next.handle(api);
  }
}
