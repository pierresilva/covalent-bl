import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TdLayoutManageListComponent, TdMediaService } from '@covalent/core';
import { tdRotateAnimation } from '@covalent/core/common';
import { BlNotificationService } from '../../shared/bl-components/notification';
import { BlMessageService } from '../../shared/bl-components/message/bl-message.service';

import * as $ from 'jquery';
import { _HttpClient } from '../../shared/bl-packages/http';
import { environment } from '../../../environments/environment';
import { CacheService } from '../../shared/bl-packages/cache';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    tdRotateAnimation,
  ],
})
export class LandingComponent implements OnInit, AfterViewInit {

  @ViewChild('manageList') manageList: TdLayoutManageListComponent;

  miniNav: boolean = false;

  constructor(
    public media: TdMediaService,
    private _changeDetectorRef: ChangeDetectorRef,
    private notification: BlNotificationService,
    private message: BlMessageService,
    private _http: _HttpClient,
    public cacheService: CacheService,
  ) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit(): void {
    console.log(environment.app_url + environment.api_prefix + 'test');
    this._http.get(environment.app_url + environment.api_prefix + 'test?_allow_anonymous=true', { pi: 1 })
      .subscribe((res: any) => {
        console.log(res);
      });

    let testList: any;
    this.cacheService.get(environment.app_url + environment.api_prefix + 'users?_allow_anonymous=true')
      .subscribe((res: any) => {
        testList = res;
      });
    console.log(testList);

    let testUser: any;
    this.cacheService.get(environment.app_url + environment.api_prefix + 'user')
      .subscribe(
        (res: any) => console.log('success', res),
        (err: any) => console.error('error', err),
      );
    console.log(testUser);
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();

    let transitionEnd: any = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    let transitionsSupported: any = ($('.csstransitions').length > 0);
    // if browser does not support transitions - use a different event to trigger them
    if (!transitionsSupported) {
      transitionEnd = 'noTransition';
    }

  }

  toggleMiniNav(): void {
    this.miniNav = !this.miniNav;
    setTimeout(() => {
      // this.manageList.sidenav._animationStarted.emit();
    });
  }

  createBasicNotification(template: TemplateRef<{}>): void {
    // this.notification.template(template, { blDuration: 0});
    this.notification.error('Title Error', 'Notification content.<br><b>Some bold content</b>', { blDuration: 0 });
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

}
