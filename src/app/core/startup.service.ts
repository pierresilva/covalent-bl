import { Inject, Injectable } from '@angular/core';
import { ACLService } from '../shared/bl-packages/acl';
import { TitleService } from '../shared/bl-packages/title';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { SettingsService } from '../shared/bl-packages/settings';
import { MenuService } from '../shared/bl-packages/menu';
import { TranslateService } from '@ngx-translate/core';
import { BlI18nService } from '../shared/bl-components/i18n';
import { BL_I18N_TOKEN } from '../shared/bl-packages/i18n';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { CacheService } from '../shared/bl-packages/cache';

@Injectable({
  providedIn: 'root',
})
export class StartupService {

  defLang: string = environment.def_lang;

  constructor(
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private settingService: SettingsService,
    private menuService: MenuService,
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private cacheService: CacheService,
  ) {

    if (!this.localStorage.getItem('theme')) {
      this.localStorage.setItem('theme', environment.theme);
    }

    if (!this.localStorage.getItem('lang')) {
      this.defLang = environment.def_lang;
      this.localStorage.setItem('lang', this.defLang);
    }

    if (!this.localStorage.getItem('app')) {
      this.localStorage.setItem('app', JSON.stringify({
        name: 'App',
        description: 'Some App',
      }), false);
    }

    this.translate.setDefaultLang(this.localStorage.getItem('lang'));
    this.defLang = this.localStorage.getItem('lang');
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve: any) => {
      this.translate.setDefaultLang(this.defLang);
      zip(
        this.httpClient.get(environment.app_url + environment.api_prefix + 'settings?_allow_anonymous=true'),
        this.httpClient.get(environment.app_url + environment.api_prefix + 'translations/' + this.defLang + '?_allow_anonymous=true'),
      )
        .pipe(
          // Exception message generated after receiving other interceptors
          // tslint:disable-next-line: typedef
          catchError(([settingsData, transData]) => {
            // tslint:disable-next-line: no-null-keyword
            resolve(null);
            return [settingsData, transData];
          }),
        )
        .subscribe(
          // tslint:disable-next-line: typedef
          ([settingsData, transData]) => {
            console.log('server defaults');
            // setting language data
            this.translate.setDefaultLang(this.defLang);
            this.translate.setTranslation(this.defLang, transData.translations);

            // application data
            const res: any = settingsData;
            // Application information: including site name, description, year
            this.settingService.setApp(res.app);
            // User information: including name, avatar, email address
            // this.settingService.setUser(res.user);
            // ACL: Set the roles and permissions
            // this.aclService.setFull(true);
            // Initialization menu
            // this.menuService.add(res.menu);
            // Set the suffix of the page title
            this.titleService.default = '';
            this.titleService.suffix = res.app.name;
            if (this.cacheService.has(environment.app_prefix + 'user')) {
              const user = JSON.parse(this.cacheService.getNone(environment.app_prefix + 'user'));
              this.aclService.attachRole(user.role);
              this.aclService.attachAbility(user.ability);
            }
          },
          (err: any) => {
            // tslint:disable-next-line: no-console
            console.error(err);
          },
          () => {
            // tslint:disable-next-line: no-console
            console.log('Complete');
            // tslint:disable-next-line: no-null-keyword
            resolve(null);
          },
        );
    });
  }
}
