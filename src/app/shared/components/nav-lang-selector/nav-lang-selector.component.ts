import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'bl-nav-lang-selector',
  templateUrl: './nav-lang-selector.component.html',
  styleUrls: ['./nav-lang-selector.component.scss']
})
export class NavLangSelectorComponent implements OnInit {
  langs: any[] = environment.langs;

  constructor(
    private translateService: TranslateService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void { }

  get getCurrentLanguage(): any {
    return this.translateService.getDefaultLang();
  }

  setLanguage(code: string): any {
    this.localStorage.setItem('lang', code);
    location.reload();
  }
}
