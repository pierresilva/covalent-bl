import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoadingService } from './loading.service';
import { empty } from 'rxjs/internal/Observer';
import { TdDialogService, TdLoadingService } from '@covalent/core';
import { MatBottomSheet } from '@angular/material';
import { BlDisplayErrorComponent } from './display-error/display-error.component';

@Injectable()

/**
 * Interceptor http para el manejo de errores HTTP
 */
export class HttpInterceptorService implements HttpInterceptor {

  /**
   * Cantidad de peticiones HTTP en ejecucion
   */
  pendingRequests: number = 0;

  constructor(
    private loading: LoadingService,
    private _dialogService: TdDialogService,
    private bottomSheet: MatBottomSheet,
    private _loadingService: TdLoadingService,
  ) {
  }

  /**
   * Manejo del interceptor
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this._loadingService.register();
    const cloneReq: any = req.clone({
      url: req.url,
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    this.track(true);

    return next.handle(cloneReq)
      .catch((error: any, caught: any) => {
        console.error(error);
        let responseErrors: any[] = [];
        if (error.error && error.status >= 400) {
          if (error.error.response) {
            if (error.error.response.errors) {
              const errorKeys: any[] = Object.keys(error.error.response.errors);

              for (let i = 0; i < errorKeys.length; i++) {
                if (Array.isArray(error.error.response.errors[errorKeys[i]])) {
                  for (let j = 0; j < error.error.response.errors[errorKeys[i]].length; j++) {
                    responseErrors.push(error.error.response.errors[errorKeys[i]][j]);
                  }
                } else {
                  responseErrors.push(error.error.response.errors[errorKeys[i]]);
                }
              }
            }
          }
        }

        if (environment.production == false && error.error) {
          this.bottomSheet.open(BlDisplayErrorComponent, {
            data: {
              title: error.error.message,
              errors: responseErrors,
              color: 'red',
              icon: 'error_outline',
            },
          });
        }

        return Observable.throw(error);
      })
      .finally(() => {
        this.track(false);
        // this._loadingService.resolve();
      });
  }

  /**
   * Monitorea la cantidad de peticiones HTTP
   * @param track
   */
  track(track: boolean): void {
    if (track) {
      this.pendingRequests++;
    } else {
      this.pendingRequests--;
    }
    if (this.pendingRequests > 0) {
      this.loading.isLoadingSubject.next(true);
    } else {
      this.loading.isLoadingSubject.next(false);
    }

  }
}
