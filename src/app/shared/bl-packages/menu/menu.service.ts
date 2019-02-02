import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';

import { ACLService } from '../acl/acl.service';

import { BlI18NService, BL_I18N_TOKEN } from '../i18n/i18n';
import { Menu, MenuIcon } from './interface';

@Injectable({providedIn: 'root'})
export class MenuService implements OnDestroy {

  get change(): Observable<Menu[]> {
    return this._change$.pipe(share());
  }

  get menus(): any {
    return this.data;
  }
  private _change$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  private i18n$: Subscription;

  private data: Menu[] = [];

  constructor(
    @Optional()
    @Inject(BL_I18N_TOKEN)
    private i18nSrv: BlI18NService,
    @Optional() private aclService: ACLService,
  ) {
    this.i18n$ = this.i18nSrv.change.subscribe(() => this.resume());
  }

  visit(data: Menu[], callback: (item: Menu, parentMenum: Menu, depth?: number) => void): void {
    const inFn: any = (list: Menu[], parentMenu: Menu, depth: number) => {
      for (const item of list) {
        callback(item, parentMenu, depth);
        if (item.children && item.children.length > 0) {
          inFn(item.children, item, depth + 1);
        } else {
          item.children = [];
        }
      }
    };

    inFn(data, undefined, 0);
  }

  add(items: Menu[]): any {
    this.data = items;
    this.resume();
  }

  /**
   * Menú de reinicio, puede que tenga que llamar a actualizar cuando I18N, los derechos de usuario cambian
   */
  resume(callback?: (item: Menu, parentMenum: Menu, depth?: number) => void): void {
    let i: any = 1;
    const shortcuts: Menu[] = [];
    this.visit(this.data, (item: any, parent: any, depth: any) => {
      item.__id = i++;
      item.__parent = parent;
      item._depth = depth;

      if (!item.link) { item.link = ''; }
      if (!item.externalLink) { item.externalLink = ''; }

      // badge
      if (item.badge) {
        if (item.badgeDot !== true) {
          item.badgeDot = false;
        }
        if (!item.badgeStatus) {
          item.badgeStatus = 'error';
        }
      }

      item._type = item.externalLink ? 2 : 1;
      if (item.children && item.children.length > 0) {
        item._type = 3;
      }

      // icon
      if (typeof item.icon === 'string') {
        let type: any = 'class';
        let value: any = item.icon;
        // compatible `anticon anticon-user`
        if (item.icon.indexOf(`anticon-`)) {
          type = 'icon';
          value = value
            .split('-')
            .slice(1)
            .join('-');
        } else if (/^https?:\/\//.test(item.icon)) {
          type = 'img';
        }
        // tslint:disable-next-line:no-any
        item.icon = {type, value} as any;
      }
      if (item.icon !== undefined) {
        item.icon = {theme: 'outline', spin: false, ...(item.icon as MenuIcon)};
      }

      item.text = item.i18n && this.i18nSrv ? this.i18nSrv.fanyi(item.i18n) : item.text;

      // group
      item.group = item.group !== false;

      // hidden
      item._hidden = typeof item.hide === 'undefined' ? false : item.hide;

      // disabled
      item.disabled = typeof item.disabled === 'undefined' ? false : item.disabled;

      // acl
      item._aclResult = item.acl && this.aclService ? this.aclService.can(item.acl) : true;

      // shortcut
      if (parent && item.shortcut === true && parent.shortcutRoot !== true) {
        shortcuts.push(item);
      }

      if (callback) { callback(item, parent, depth); }
    });

    this.loadShortcut(shortcuts);
    this._change$.next(this.data);
  }

  /**
   * Menú vacío
   */
  clear(): void {
    this.data = [];
    this._change$.next(this.data);
  }

  getHit(data: Menu[], url: string, recursive: any = false, cb: (i: Menu) => void = undefined): any {
    let item: Menu = undefined;

    while (!item && url) {
      this.visit(data, (i: any) => {
        if (cb) {
          cb(i);
        }
        if (i.link !== undefined && i.link === url) {
          item = i;
        }
      });

      if (!recursive) { break; }

      url = url
        .split('/')
        .slice(0, -1)
        .join('/');
    }

    return item;
  }

  /**
   * Establecer el atributo `_open` del menú según la URL
   * - Si `recursive: true` buscará automáticamente recursivamente
   * - La fuente de datos del menú contiene `/ ware`, entonces` / ware / 1` también se trata como `/ ware`
   */
   openedByUrl(url: string, recursive: any = false): void {
    if (!url) { return; }

    let findItem: any = this.getHit(this.data, url, recursive, (i: any) => {
      i._selected = false;
      i._open = false;
    });
    if (!findItem) { return; }

    do {
      findItem._selected = true;
      findItem._open = true;
      findItem = findItem.__parent;
    } while (findItem);
  }

 /**
  * Obtener lista de menú basado en url
  * - Si `recursive: true` buscará automáticamente recursivamente
  * - La fuente de datos del menú contiene `/ ware`, entonces` / ware / 1` también se trata como `/ ware`
  */
  getPathByUrl(url: string, recursive: any = false): Menu[] {
    const ret: Menu[] = [];
    let item: any = this.getHit(this.data, url, recursive);

    if (!item) { return ret; }

    do {
      ret.splice(0, 0, item);
      item = item.__parent;
    } while (item);

    return ret;
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
    this.i18n$.unsubscribe();
  }

  /**
   * Cargar el menú de acceso directo, las reglas de posición de carga son las siguientes:
   * 1, unificado bajo el nodo del subíndice 0 (es decir, el nodo [navegación principal] a continuación)
   * 1. Si existen hijos [shortcutRoot: true] entonces la prioridad más alta [recomendado] de esta manera
   * 2, de lo contrario, busque el enlace con la palabra [tablero], si existe, cree una entrada de acceso directo debajo del menú.
   * 3, de lo contrario colocado en la posición del nodo 0
   */
  private loadShortcut(shortcuts: Menu[]): any {
    if (shortcuts.length === 0 || this.data.length === 0) {
      return;
    }

    const ls: any = this.data[0].children;
    let pos: any = ls.findIndex((w: any) => w.shortcutRoot === true);
    if (pos === -1) {
      pos = ls.findIndex((w: any) => w.link.includes('dashboard'));
      pos = (pos !== -1 ? pos : -1) + 1;
      const shortcutMenu: any = {
        text: 'Menú contextual',
        i18n: 'shortcut',
        icon: 'icon-rocket',
        children: [],
      } as Menu;
      this.data[0].children.splice(pos, 0, shortcutMenu);
    }
    let _data: any = this.data[0].children[pos];
    if (_data.i18n && this.i18nSrv) { _data.text = this.i18nSrv.fanyi(_data.i18n); }
    // tslint:disable-next-line:prefer-object-spread
    _data = Object.assign(_data, {
      shortcutRoot: true,
      __id: -1,
      __parent: undefined,
      _type: 3,
      _depth: 1,
    });
    _data.children = shortcuts.map((i: any) => {
      i._depth = 2;
      i.__parent = _data;
      return i;
    });
  }
}
