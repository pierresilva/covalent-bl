import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  template: `<mat-form-field style="width: 100%;">
    <input matInput [formControl]="control" [placeholder]="label">
    <mat-hint align="end" *ngIf="errorMessageTemplate && control?.errors">
      <ng-template
        [ngTemplateOutlet]="errorMessageTemplate"
        [ngTemplateOutletContext]="{control: control, errors: control?.errors}">
      </ng-template>
    </mat-hint>
  </mat-form-field>`,
})
export class CustomDynamicFieldComponent implements OnInit, AfterViewInit, OnDestroy {

  /* control property needed to properly bind the underlying element */
  control: FormControl;

  /* map any of the properties you passed in the config */
  label: string;

  /* map the error message template and use it anywhere you need to */
  errorMessageTemplate: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }
}
