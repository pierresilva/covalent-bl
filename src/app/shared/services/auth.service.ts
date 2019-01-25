import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root',
})

/**
 * Access Control Layer
 */
export class AuthService {

  public userLogged: boolean = false;

  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private localStorage: LocalStorageService,
  ) {
    this.init();
    this.isLogged.subscribe((data: any) => {
      this.userLogged = data;
    });
  }

  init(): void {
    if (this.localStorage.getItem('token')) {
      this.isLogged.next(true);
    }
  }
}
