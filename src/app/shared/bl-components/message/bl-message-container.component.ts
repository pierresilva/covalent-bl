import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { BlMessageConfig, BL_MESSAGE_CONFIG, BL_MESSAGE_DEFAULT_CONFIG } from './bl-message-config';
import { BlMessageDataFilled, BlMessageDataOptions } from './bl-message.definitions';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'bl-message-container',
  preserveWhitespaces: false,
  templateUrl        : './bl-message-container.component.html'
})
export class BlMessageContainerComponent {
  messages: BlMessageDataFilled[] = [];
  config: BlMessageConfig = {};

  constructor(
    protected cdr: ChangeDetectorRef,
    @Optional() @Inject(BL_MESSAGE_DEFAULT_CONFIG) defaultConfig: BlMessageConfig,
    @Optional() @Inject(BL_MESSAGE_CONFIG) config: BlMessageConfig,
  ) {
    this.setConfig({ ...defaultConfig, ...config });
  }

  setConfig(config: BlMessageConfig): void {
    this.config = { ...this.config, ...config };
  }

  // Create a new message
  createMessage(message: BlMessageDataFilled): void {
    if (this.messages.length >= this.config.blMaxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this._mergeMessageOptions(message.options);
    this.messages.push(message);
    this.cdr.detectChanges();
  }

  // Remove a message by messageId
  removeMessage(messageId: string): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        this.cdr.detectChanges();
        return true;
      }
    });
  }

  // Remove all messages
  removeMessageAll(): void {
    this.messages = [];
    this.cdr.detectChanges();
  }

  // Merge default options and custom message options
  protected _mergeMessageOptions(options: BlMessageDataOptions): BlMessageDataOptions {
    const defaultOptions: BlMessageDataOptions = {
      blDuration    : this.config.blDuration,
      blAnimate     : this.config.blAnimate,
      blPauseOnHover: this.config.blPauseOnHover,
    };
    return { ...defaultOptions, ...options };
  }
}
