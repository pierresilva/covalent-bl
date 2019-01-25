import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import {
  BLA_SERVICE_TOKEN,
  ITokenModel,
  ITokenService,
} from '../token/interface';

const OPENTYPE = '_delonAuthSocialType';
const HREFCALLBACK = '_delonAuthSocialCallbackByHref';

export type SocialOpenType = 'href' | 'window';

@Injectable()
export class SocialService implements OnDestroy {
  private _win: Window;
  private _winTime;
  private observer: Observer<ITokenModel>;

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private tokenService: ITokenService,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) private doc: any,
    private router: Router,
  ) { }

  /**
   * Use the form to open the authorization page, the return value is `Observable<ITokenModel>`
   * and the result returned after subscribing to the authorization
   *
   * @param url Get the authorized address
   * @param callback callback routing address
   * @param options.windowFeatures is equivalent to the `features` parameter value of `window.open`
   */
  login(
    url: string,
    callback?: string,
    options?: {
      type?: 'window';
      windowFeatures?: string;
    },
  ): Observable<ITokenModel>;

  /**
   * Jump to the authorization page
   * @param url Obtain an authorized address
   * @param callback Callback routing address
   */
  login(
    url: string,
    callback?: string,
    options?: {
      type?: 'href';
    },
  ): void;

  /**
   * Jump to the login page. If it is `type=window`, the return value is `Observable<ITokenModel>`
   * @param url Get the authorized address
   * @param callback Callback routing address when `type=href` is successful
   * @param options.type Open mode, default `window`
   * @param options.windowFeatures is equivalent to the `features` parameter value of `window.open`
   */
  login(
    url: string,
    callback: string = '/',
    options: {
      type?: SocialOpenType;
      windowFeatures?: string;
    } = {},
  ): Observable<ITokenModel> | void {
    options = {
      type: 'window',
      windowFeatures:
        'location=yes,height=570,width=520,scrollbars=yes,status=yes',
      ...options,
    };
    localStorage.setItem(OPENTYPE, options.type);
    localStorage.setItem(HREFCALLBACK, callback);
    if (options.type === 'href') {
      this.doc.location.href = url;
      return;
    }

    this._win = window.open(url, '_blank', options.windowFeatures);
    this._winTime = setInterval(() => {
      if (this._win && this._win.closed) {
        this.ngOnDestroy();

        let model = this.tokenService.get();
        if (model && !model.token) model = null;

        // Trigger change notification
        if (model) {
          this.tokenService.set(model);
        }

        this.observer.next(model);
        this.observer.complete();
      }
    }, 100);
    return Observable.create((observer: Observer<ITokenModel>) => {
      this.observer = observer;
    });
  }

  /**
   * Callback processing after successful authorization
   *
   * @param rawData Specify callback authentication information. When it is empty, it is parsed from the current URL.
   */
  callback(rawData?: string | ITokenModel): ITokenModel {
    // from uri
    if (!rawData && this.router.url.indexOf('?') === -1) {
      throw new Error(`url muse contain a ?`);
    }
    // parse
    let data: ITokenModel = { token: `` };
    if (typeof rawData === 'string') {
      const rightUrl = rawData.split('?')[1].split('#')[0];
      data = this.router.parseUrl('./?' + rightUrl).queryParams as ITokenModel;
    } else {
      data = rawData;
    }

    if (!data || !data.token) throw new Error(`invalide token data`);
    this.tokenService.set(data);

    const url = localStorage.getItem(HREFCALLBACK) || '/';
    localStorage.removeItem(HREFCALLBACK);
    const type = localStorage.getItem(OPENTYPE);
    localStorage.removeItem(OPENTYPE);
    if (type === 'window') {
      window.close();
    } else {
      this.router.navigateByUrl(url);
    }

    return data;
  }

  ngOnDestroy(): void {
    clearInterval(this._winTime);
    this._winTime = null;
  }
}
