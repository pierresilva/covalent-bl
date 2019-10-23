import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const APP_TITLE: string = environment.app_title;
const SEPARATOR: string = ':';

@Injectable()

/**
 * Controla el titulo del sitio
 */
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title,
  ) {
  }

  /**
   * Capitaliza la primera letra de un string
   * @param str
   */
  static ucFirst(str: string): string {
    if (!str) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  init(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          let route: any = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: any) => route.outlet === 'primary'),
        mergeMap((route: any) => route.data),
        map((data: any) => {
          if (data.title) {
            // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
            return data.title;
          } else {
            // If not, we do a little magic on the url to create an approximation
            return this.router.url.split('/')
              .reduce((acc: any, frag: any) => {
                if (acc && frag) { acc += SEPARATOR; }
                return acc + TitleService.ucFirst(frag);
              });
          }
        }),
      )
      .subscribe((pathString: string) => this.titleService.setTitle(`${APP_TITLE} ${pathString ? SEPARATOR : ''} ${pathString}`));
  }
}
