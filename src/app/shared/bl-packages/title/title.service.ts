import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, OnDestroy, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BlI18NService, BL_I18N_TOKEN } from '../i18n/i18n';
import { MenuService } from '../menu/menu.service';

@Injectable({ providedIn: 'root' })
export class TitleService implements OnDestroy {

  /** Set separator */
  set separator(value: string) {
    this._separator = value;
  }

  /** Set prefix */
  set prefix(value: string) {
    this._prefix = value;
  }

  /** Set suffix */
  set suffix(value: string) {
    this._suffix = value;
  }

  /** Set whether to reverse */
  set reverse(value: boolean) {
    this._reverse = value;
  }
  private _prefix: any = '';
  private _suffix: any = '';
  private _separator: any = ' - ';
  private _reverse: any = false;
  private i18n$: Subscription;

  /** Set default title name */
  default: any = `Not Page Name`;

  constructor(
    private injector: Injector,
    private title: Title,
    private menuSrv: MenuService,
    @Optional()
    @Inject(BL_I18N_TOKEN)
    private i18nSrv: BlI18NService,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) private doc: any,
  ) {
    this.i18n$ = this.i18nSrv.change
      .pipe(filter(() => !!this.i18n$))
      .subscribe(() => this.setTitle());
  }

  /**
   * Set title
   */
  setTitle(title?: string | string[]): void {
    if (!title) {
      title = this.getByRoute() || this.getByMenu() || this.getByElement() || this.default;
    }
    if (title && !Array.isArray(title)) {
      title = [title];
    }

    let newTitles: any[] = [];
    if (this._prefix) {
      newTitles.push(this._prefix);
    }
    newTitles.push(...(title as string[]));
    if (this._suffix) {
      newTitles.push(this._suffix);
    }
    if (this._reverse) {
      newTitles = newTitles.reverse();
    }
    this.title.setTitle(newTitles.join(this._separator));
  }

  /**
   * Set international title
   */
  setTitleByI18n(key: string, params?: {}): void {
    this.setTitle(this.i18nSrv.fanyi(key, params));
  }

  ngOnDestroy(): void {
    this.i18n$.unsubscribe();
  }

  private getByElement(): string {
    const el: any =
      this.doc.querySelector('.alain-default__content-title h1') ||
      this.doc.querySelector('.page-header__title');
    if (el) {
      return el.firstChild.textContent.trim();
    }
    return '';
  }

  private getByRoute(): string {
    let next: any = this.injector.get(ActivatedRoute);
    while (next.firstChild) { next = next.firstChild; }
    const data: any = (next.snapshot && next.snapshot.data) || {};
    if (data.titleI18n && this.i18nSrv) { data.title = this.i18nSrv.fanyi(data.titleI18n); }
    return data.title;
  }

  private getByMenu(): string {
    const menus: any = this.menuSrv.getPathByUrl(this.injector.get(Router).url);
    if (!menus || menus.length <= 0) { return ''; }

    const item: any = menus[menus.length - 1];
    let title: any;
    if (item.i18n && this.i18nSrv) { title = this.i18nSrv.fanyi(item.i18n); }
    return title || item.text;
  }
}
