import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TdLayoutManageListComponent, TdMediaService } from '@covalent/core';
import { tdRotateAnimation } from '@covalent/core/common';
import { BlNotificationService } from '../../shared/bl-components/notification';
import { BlMessageService } from '../../shared/bl-components/message/bl-message.service';

import * as $ from 'jquery';

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
  ) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();

    let transitionEnd: any = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    let transitionsSupported: any = ( $('.csstransitions').length > 0 );
    // if browser does not support transitions - use a different event to trigger them
    if ( !transitionsSupported ) {
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
    this.notification.error('Title Error', 'Notification content.<br><b>Some bold content</b>', {blDuration: 0});
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

}
