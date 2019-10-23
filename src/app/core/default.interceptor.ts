import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { _HttpClient } from '../shared/bl-packages/http';
import { BlMessageService } from '../shared/bl-components/message';
import { BlNotificationService } from '../shared/bl-components/notification';
import { environment } from '../../environments/environment';
import { BLA_SERVICE_TOKEN, ITokenService } from '../shared/bl-packages/auth';
import { TdLoadingService } from '@covalent/core';

const CODEMESSAGE: any = {
  200: 'The server successfully returned the requested data.',
  201: 'Create or modify data successfully.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'The request was made with an error and the server did not perform any operations to create or modify data.',
  401: 'User does not have permission (token, username, password is incorrect).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request is made for a record that does not exist and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will not be retrieved.',
  422: 'A validation error occurred when creating an object.',
  429: 'Too many attempts. Please try again in a fwe seconds..',
  500: 'An error occurred on the server. Please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
  504: 'The gateway timed out.',
};

/**
 * The default HTTP interceptor, see `app.module.ts` for registration details.
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  get _loading(): TdLoadingService {
    return this.injector.get(TdLoadingService);
  }

  get msg(): BlMessageService {
    return this.injector.get(BlMessageService);
  }

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Unified plus server prefix
    let url: any = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = url;
    }

    const newReq: any = req.clone({ url });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // Allow unified handling of request errors
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // If everything is ok, follow-up
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: any): void {

    if (ev.status >= 200 && ev.status < 300) {
      if (ev.body) {
        if (ev.body.message) {
          this.injector.get(BlNotificationService).success(
            ev.body.message,
            // tslint:disable-next-line: no-null-keyword
            null,
          );
        }
      }
      return;
    }

    const errorText: any = CODEMESSAGE[ev.status] || ev.statusText;

    let errors: string = '';

    if (ev.status >= 400 && ev.error) {
      if (ev.error.response) {
        if (ev.error.response.errors) {
          for (let error in ev.error.response.errors) {
            errors = errors + '<br>' + ev.error.response.errors[error];
          }
        }
      }
    }
    if (ev.error) {
      this.injector.get(BlNotificationService).error(
        ev.error.message ? ev.error.message : `Request error ${ev.status}: ${ev.url}`,
        errors.length ? errors : errorText,
      );
    }

  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    // The `end()` operation of `_HttpClient` cannot be executed because `throw` is exported.
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev);
    // Business Processing: Some general operations
    switch (ev.status) {
      case 200:
        // Business level error handling, the following is assuming that restful has a unified output format
        // (meaning that there is a corresponding data format regardless of success or failure)
        // Such as response content：
        //  Error content: { status: 1, msg: 'Illegal parameter' }
        //  Correct content: { status: 0, response: { } }
        // The following code snippet can be applied directly
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.status !== 0) {
            this.msg.error(body.msg);
            // Continue to throw an error interrupt all subsequent Pipe, subscribe operations, therefore:
            // this.http.get('/').subscribe() Does not trigger
            return throwError({});
          } else {
            // Revise the `body` content to `response` content, no longer need to care about the
            // business status code for most scenarios
            // return of(new HttpResponse(Object.assign(ev, { body: body.response })));
            // Or still maintain the full format
            return of(ev);
          }
        }
        break;
      case 401: // Unlogged status code
        // Request error 401: https://preview.pro/api/401 User does not have permission
        // (token, username, password error).
        (this.injector.get(BLA_SERVICE_TOKEN) as ITokenService).clear();
        // this.goTo('/passport/login');
        //
        if (ev instanceof HttpErrorResponse) {
          return throwError(ev);
        }
        break;
      case 403:
      case 404:
        if (ev instanceof HttpErrorResponse) {
          return throwError(ev);
        }
        break;
      case 500:
        // this.goTo(`/exception/${ev.status}`);
        if (ev instanceof HttpErrorResponse) {
          return throwError(ev);
        }
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          // tslint:disable-next-line: no-console
          console.warn('I don\'t know the error, most of it is caused by the backend not supporting CORS or invalid configuration.', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }
}
