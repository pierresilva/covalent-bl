import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

import { Bank, BANKS } from './demo-data';

import { TdMediaService } from '@covalent/core';
import { name, patterns, layouts, routes, baseURL } from '../../../../../assets/data';

import { ITdDynamicElementConfig, TdDynamicElement, TdDynamicType } from '@covalent/dynamic-forms';
import { CustomDynamicFieldComponent } from './custom-dynamic-field.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-home-home',
  templateUrl: './home-home.component.html',
  styleUrls: ['./home-home.component.scss'],
})
export class HomeHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy: any = new Subject<void>();

  layouts: any[] = [];

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  elements: ITdDynamicElementConfig[] = [{
    name: 'input',
    hint: 'hint',
    type: TdDynamicElement.Input,
    required: true,
  }, {
    name: 'textLength',
    label: 'Text Length',
    type: TdDynamicElement.Input,
    minLength: 4,
    maxLength: 12,
  }, {
    name: 'number',
    type: TdDynamicType.Number,
    min: 10,
    max: 80,
  }, {
    name: 'slider',
    label: 'Label',
    type: TdDynamicElement.Slider,
    required: true,
  }, {
    name: 'boolean',
    type: TdDynamicType.Boolean,
    default: false,
    disabled: true,
  }, {
    name: 'select',
    type: TdDynamicElement.Select,
    required: true,
    multiple: false,
    selections: ['A', 'B', 'C'],
    default: 'A',
  }, {
    name: 'file-input',
    label: 'Label',
    type: TdDynamicElement.FileInput,
  }, {
    name: 'datepicker',
    label: 'Date',
    type: TdDynamicElement.Datepicker,
  }, {
    name: 'custom',
    label: 'Custom',
    type: CustomDynamicFieldComponent,
    required: true,
  }];

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  constructor(
    public media: TdMediaService,
  ) {
    Object.assign(this, {name, patterns, layouts, routes, baseURL});
  }

  ngOnInit(): void {
    // set initial selection
    this.bankMultiCtrl.setValue([this.banks[10], this.banks[11], this.banks[12]]);

    // load the initial bank list
    this.filteredBanksMulti.next(this.banks.slice());

    // listen for search field value changes
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean): void {
    this.filteredBanksMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe((val: any) => {
        if (selectAllValue) {
          this.bankMultiCtrl.patchValue(val);
        } else {
          this.bankMultiCtrl.patchValue([]);
        }
      });
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue(): void {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti(): void {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search: any = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter((bank: any) => bank.name.toLowerCase().indexOf(search) > -1),
    );
  }

}
