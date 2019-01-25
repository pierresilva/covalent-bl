import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

/**
 * Servicio para interactual con el backend API
 */
export class ApiService {

  /**
   * Prefijo para el api
   */
  private prefix: string = environment.api_prefix;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /**
   * Interactuar con el metodo GET
   * @param path
   * @param params
   */
  get(path: string, params: any = {}): Observable<any> {
    return this.http.get<any>(`${environment.app_url}${this.prefix}${path}`, { observe: 'response' });
  }

  /**
   * Interactuar con el metodo POST
   * @param path
   * @param body
   */
  post(path: string, body: object): Observable<any> {
    return this.http.post<any>(`${environment.app_url}${this.prefix}${path}`, body);
  }

  /**
   * Interactuar con el metodo PUT
   * @param path
   * @param body
   */
  put(path: string, body: any): Observable<any> {
    return this.http.put<any>(`${environment.app_url}${this.prefix}${path}`, body);
  }

  /**
   * Interactuar con el metodo DELETE
   * @param path
   * @param body
   */
  delete(path: string, body: any): Observable<any> {
    return this.http.delete<any>(`${environment.app_url}${this.prefix}${path}`, body);
  }
}
