import { Injectable } from '@angular/core';
import { HttpClientConfig } from './http/http.config';

@Injectable({ providedIn: 'root' })
export class BlPackagesConfig {
  http?: HttpClientConfig;
}
