import { Directive, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { InputBoolean } from '../utils';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ACLService } from './acl.service';
import { ACLCanType } from './acl.type';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[aclIf]',
  exportAs: 'aclIf',
})
export class ACLIfDirective implements OnDestroy {

  @Input()
  set aclIf(value: ACLCanType) {
    this._value = value;
    this._updateView();
  }

  @Input()
  set aclIfThen(templateRef: TemplateRef<void> | null) {
    this._thenTemplateRef = templateRef;
    // tslint:disable-next-line:no-null-keyword
    this._thenViewRef = null;
    this._updateView();
  }

  @Input()
  set aclIfElse(templateRef: TemplateRef<void> | null) {
    this._elseTemplateRef = templateRef;
    // tslint:disable-next-line:no-null-keyword
    this._elseViewRef = null;
    this._updateView();
  }
  private _value: ACLCanType;
  private _change$: Subscription;
  // tslint:disable-next-line:no-null-keyword
  private _thenTemplateRef: TemplateRef<void> | null = null;
  // tslint:disable-next-line:no-null-keyword
  private _elseTemplateRef: TemplateRef<void> | null = null;
  // tslint:disable-next-line:no-null-keyword
  private _thenViewRef: EmbeddedViewRef<void> | null = null;
  // tslint:disable-next-line:no-null-keyword
  private _elseViewRef: EmbeddedViewRef<void> | null = null;

  // tslint:disable-next-line:typedef
  @Input() @InputBoolean() except = false;

  constructor(templateRef: TemplateRef<void>, private srv: ACLService, private _viewContainer: ViewContainerRef) {
    // tslint:disable
    this._change$ = this.srv.change.pipe(filter(r => r != null)).subscribe(() => this._updateView());
    this._thenTemplateRef = templateRef;
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
  }

  protected _updateView(): void {
    // tslint:disable-next-line:typedef
    const res = this.srv.can(this._value);
    if ((res && !this.except) || (!res && this.except)) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        // tslint:disable-next-line:no-null-keyword
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        // tslint:disable-next-line:no-null-keyword
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
  }
}
