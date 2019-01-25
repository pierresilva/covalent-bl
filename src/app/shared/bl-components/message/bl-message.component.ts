import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { BlMessageContainerComponent } from './bl-message-container.component';
import { BlMessageDataFilled, BlMessageDataOptions } from './bl-message.definitions';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'bl-message',
  preserveWhitespaces: false,
  animations         : [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({ opacity: 0, transform: 'translateY(-50%)' })),
      transition('* => leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('100ms linear')
      ])
    ])
  ],
  templateUrl        : './bl-message.component.html'
})
export class BlMessageComponent implements OnInit, OnDestroy {

  @Input() blMessage: BlMessageDataFilled;
  @Input() blIndex: number;

  protected _options: BlMessageDataOptions; // Shortcut reference to blMessage.options

  // For auto erasing(destroy) self
  private _autoErase: boolean; // Whether record timeout to auto destroy self
  private _eraseTimer: number = null;
  private _eraseTimingStart: number;
  private _eraseTTL: number; // Time to live

  constructor(
    private _messageContainer: BlMessageContainerComponent,
    protected cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this._options = this.blMessage.options;

    if (this._options.blAnimate) {
      this.blMessage.state = 'enter';
    }

    this._autoErase = this._options.blDuration > 0;

    if (this._autoErase) {
      this._initErase();
      this._startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this._autoErase) {
      this._clearEraseTimeout();
    }
  }

  onEnter(): void {
    if (this._autoErase && this._options.blPauseOnHover) {
      this._clearEraseTimeout();
      this._updateTTL();
    }
  }

  onLeave(): void {
    if (this._autoErase && this._options.blPauseOnHover) {
      this._startEraseTimeout();
    }
  }

  // Remove self
  protected _destroy(): void {
    if (this._options.blAnimate) {
      this.blMessage.state = 'leave';
      this.cdr.detectChanges();
      setTimeout(() => this._messageContainer.removeMessage(this.blMessage.messageId), 200);
    } else {
      this._messageContainer.removeMessage(this.blMessage.messageId);
    }
  }

  private _initErase(): void {
    this._eraseTTL = this._options.blDuration;
    this._eraseTimingStart = Date.now();
  }

  private _updateTTL(): void {
    if (this._autoErase) {
      this._eraseTTL -= Date.now() - this._eraseTimingStart;
    }
  }

  private _startEraseTimeout(): void {
    if (this._eraseTTL > 0) {
      this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
      // TODO: `window` should be removed in milestone II
      this._eraseTimer = window.setTimeout(() => this._destroy(), this._eraseTTL);
      this._eraseTimingStart = Date.now();
    } else {
      this._destroy();
    }
  }

  private _clearEraseTimeout(): void {
    if (this._eraseTimer !== null) {
      window.clearTimeout(this._eraseTimer);
      this._eraseTimer = null;
    }
  }
}
