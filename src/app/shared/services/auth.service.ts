import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { BLA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '../bl-packages/auth';

@Injectable({
  providedIn: 'root',
})

/**
 * Access Control Layer
 */
export class AuthService {

  public userLogged: boolean = true;

  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(BLA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.init();
    this.isLogged.subscribe((data: any) => {
      this.userLogged = data;
    });
  }

  init(): void {
    if (this.tokenService.get(JWTTokenModel).token) {
      this.isLogged.next(true);
    }
  }
}
