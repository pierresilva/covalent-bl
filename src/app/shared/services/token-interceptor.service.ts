import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root',
})

/**
 * Interceptor HTTP para injectar el token al header
 */
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private localStorage: LocalStorageService,
  ) {
  }

  /**
   * Manejo del interceptor
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: any[] = request.url.split('/');
    const apiUrl: any[] = environment.app_url.split('/');
    const token: string = this.localStorage.getItem('token');

    if (token && (requestUrl[2] === apiUrl[2])) {
      const newRequest: HttpRequest<any> = request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
