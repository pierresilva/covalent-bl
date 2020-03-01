import { Component, OnInit, Renderer2, ElementRef, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TitleService } from './shared/services/title.service';
import { ApiService } from './shared/services/api.service';
import { ThemeService } from './shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { LocalStorageService } from './shared/services/local-storage.service';
import { BLA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from './shared/bl-packages/auth';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  template: `<div [class]="currentTheme"><router-outlet></router-outlet></div>`,
})

/**
 * Componente principal
 */
export class AppComponent implements OnInit {

  currentTheme: any = this.theme.theme.value;

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private tokenService: ITokenService,
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    public titleSrv: TitleService,
    private api: ApiService,
    private theme: ThemeService,
    private translateService: TranslateService,
    private localStorage: LocalStorageService,
  ) {
    // console.log('app.component loaded');
    // console.log(tokenService.get().token);
    // // When JWT
    // console.log(tokenService.get(JWTTokenModel).token);

    this._iconRegistry.addSvgIconInNamespace('assets', 'user',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/user.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg'),
    );
    this._iconRegistry.addSvgIcon('teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/teradata.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/teradata.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-dark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/teradata-dark.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/covalent.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icoimagesns/covalent-mark.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/github.svg'),
    );
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/covalent-mark.svg'),
    );

    if (!this.localStorage.getItem('lang')) {
      this.localStorage.setItem('lang', 'es');
    }

    this.translateService.setDefaultLang(this.localStorage.getItem('lang'));

    for (let i = 0; i < environment.langs.length; i++) {
      // Supported languages
      this.translateService.addLangs([environment.langs[i].code]);
    }

    // Get selected language and load it
    this.translateService.use(this.localStorage.getItem('lang'));
  }

  ngOnInit(): void {
    this.theme.theme.subscribe((data: string) => {
      this.currentTheme = data;
    });
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof NavigationEnd),
      )
      .subscribe(() => { });
    this.titleSrv.init();
  }
}
