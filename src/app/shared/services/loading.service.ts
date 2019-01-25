import { Injectable, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * Monitorea la carga de las peticiones HTTP
 */
export class LoadingService implements OnInit {

  public isLoadingSubject: any = new ReplaySubject<boolean>(1);
  public isLoading: any = this.isLoadingSubject.asObservable();

  constructor() {
  }

  ngOnInit(): void {
    this.isLoadingSubject.next(false);
  }
}
