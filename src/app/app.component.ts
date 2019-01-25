import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TitleService } from './shared/services/title.service';
import { ApiService } from './shared/services/api.service';
import { ThemeService } from './shared/services/theme.service';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {LocalStorageService} from "./shared/services/local-storage.service";

@Component({
  selector: 'app-root',
  template: `<div [class]="currentTheme"><router-outlet></router-outlet></div>`,
})

/**
 * Componente principal
 */
export class AppComponent implements OnInit {

  currentTheme: any = this.theme.theme.value;

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private titleSrv: TitleService,
    private api: ApiService,
    private theme: ThemeService,
    private translateService: TranslateService,
    private localStorage: LocalStorageService,
  ) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'user',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/user.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg'));

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
