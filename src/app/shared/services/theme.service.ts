import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

/**
 * Controla el tema del sitio
 */
export class ThemeService {

  public theme: BehaviorSubject<string> = new BehaviorSubject<string>(this.getTheme());

  defaultTheme: string = environment.theme;

  constructor(
    private localStorage: LocalStorageService,
  ) {
    if (!this.localStorage.getItem('theme')) {
      this.setTheme(this.defaultTheme);
    }
  }

  /**
   * Obtiene el tema actual del sitio
   */
  public getTheme(): string {
    return this.localStorage.getItem('theme');
  }

  /**
   * Establece el tema del sitio
   * @param theme
   */
  public setTheme(theme: string): void {
    this.localStorage.setItem('theme', theme);
    this.theme.next(this.getTheme());
  }
}
