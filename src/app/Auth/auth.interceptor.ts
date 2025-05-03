import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth_token = localStorage.getItem('token');
    if (auth_token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + auth_token)
      });
    }
    return next.handle(request);
  }
}
