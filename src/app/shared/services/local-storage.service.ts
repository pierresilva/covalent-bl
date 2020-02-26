import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

/**
 * Servicio para interactuar con localStorage
 */
export class LocalStorageService {

  /**
   * Prefijo para los items de localStorage
   */
  private prefix: string = environment.app_prefix;

  constructor() {
  }

  /**
   * Obtener un item de localStorage
   * @param name
   */
  public getItem(name: string): any {
    return localStorage.getItem(this.prefix + name);
  }

  /**
   * Establece el valor de un item de localStorage
   * @param name
   */
  public setItem(name: string, value: any, usePrefix: any = true): void {
    localStorage.setItem((usePrefix ? this.prefix : '') + name, value);
  }

  /**
   * Eliminar un item de localStorage
   * @param name
   */
  public removeItem(name: string): void {
    localStorage.removeItem(this.prefix + name);
  }

  /**
   * Limpiar por completo localStorage
   */
  public clear(): void {
    localStorage.clear();
  }
}
