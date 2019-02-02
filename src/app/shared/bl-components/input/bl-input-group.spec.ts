import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BlInputGroupComponent } from './bl-input-group.component';
import { BlInputDirective } from './bl-input.directive';
import { BlInputModule } from './bl-input.module';

describe('input-group', () => {
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ BlInputModule, FormsModule, ReactiveFormsModule ],
      declarations: [ BlTestInputGroupAddonComponent, BlTestInputGroupAffixComponent, BlTestInputGroupMultipleComponent, BlTestInputGroupColComponent, BlTestInputGroupMixComponent ],
      providers   : []
    }).compileComponents();
  }));
  describe('input group', () => {
    describe('addon', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputGroupAddonComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(BlInputGroupComponent)).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild.classList).not.toContain('bl-input-group');
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.lastElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.firstElementChild.firstElementChild.innerText).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.lastElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.firstElementChild.firstElementChild.innerText).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.firstElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.firstElementChild.lastElementChild.innerText).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.firstElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.firstElementChild.lastElementChild.innerText).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-group-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-group-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-group-wrapper-sm');
      });
    });
    describe('affix', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputGroupAffixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(BlInputGroupComponent)).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.firstElementChild.innerText).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.firstElementChild.innerText).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild.classList).toContain('bl-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.lastElementChild.innerText).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild.classList).toContain('bl-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.classList).toContain('bl-input');
        expect(inputGroupElement.lastElementChild.innerText).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-affix-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-affix-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-affix-wrapper-sm');
      });
    });
    describe('multiple', () => {
      let inputGroupElement;
      let inputs;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputGroupMultipleComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(BlInputGroupComponent)).nativeElement;
        inputs = fixture.debugElement.queryAll(By.directive(BlInputDirective));
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).not.toContain('bl-input-group-compact');
        testComponent.compact = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-group-compact');
      });
      it('should search work', () => {
        expect(inputGroupElement.classList).not.toContain('bl-input-search-enter-button');
        expect(inputGroupElement.classList).not.toContain('bl-input-search');
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-search-enter-button');
        expect(inputGroupElement.classList).toContain('bl-input-search');
      });
      it('should size work', () => {
        expect(inputGroupElement.classList).toContain('bl-input-group');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-group-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-group-sm');
      });
      it('should search size work', () => {
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-search');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-search-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('bl-input-search-sm');
      });
    });
    describe('col', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputGroupColComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(BlInputGroupComponent)).nativeElement;
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).toContain('bl-input-group');
      });
    });
    describe('mix', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputGroupMixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(BlInputGroupComponent)).nativeElement;
      });
      it('should mix work', () => {
        expect(inputGroupElement.querySelector('.bl-input-affix-wrapper').nextElementSibling.classList).toContain('bl-input-group-addon');
      });
    });
  });
});

@Component({
  selector: 'bl-test-input-group-addon',
  template: `
    <bl-input-group [blAddOnBefore]="beforeContent" [blAddOnAfter]="afterContent" [blSize]="size">
      <input type="text" bl-input>
    </bl-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class BlTestInputGroupAddonComponent {
  @ViewChild('beforeTemplate') beforeTemplate: TemplateRef<void>;
  @ViewChild('afterTemplate') afterTemplate: TemplateRef<void>;
  beforeContent;
  afterContent;
  size = 'default';
}

@Component({
  selector: 'bl-test-input-group-affix',
  template: `
    <bl-input-group [blPrefix]="beforeContent" [blSuffix]="afterContent" [blSize]="size">
      <input type="text" bl-input>
    </bl-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class BlTestInputGroupAffixComponent {
  @ViewChild('beforeTemplate') beforeTemplate: TemplateRef<void>;
  @ViewChild('afterTemplate') afterTemplate: TemplateRef<void>;
  beforeContent;
  afterContent;
  size = 'default';
}

@Component({
  selector: 'bl-test-input-group-multiple',
  template: `
    <bl-input-group [blCompact]="compact" [blSearch]="search" [blSize]="size">
      <input type="text" bl-input>
      <input type="text" bl-input>
    </bl-input-group>
  `
})
export class BlTestInputGroupMultipleComponent {
  compact = false;
  search = false;
  size = 'default';
}

/** https://github.com/NG-ZORRO/ng-zorro-bld/issues/1795 **/
@Component({
  selector: 'bl-test-input-group-mix',
  template: `
    <bl-input-group blPrefixIcon="blicon blicon-user" blAddOnAfter="@example.com">
      <input type="text" bl-input placeholder="邮箱地址">
    </bl-input-group>
  `
})
export class BlTestInputGroupMixComponent {
}

@Component({
  selector: 'bl-test-input-group-col',
  template: `
    <bl-input-group>
      <div bl-col blSpan="4">
        <input type="text" bl-input [ngModel]="'0571'">
      </div>
      <div bl-col blSpan="8">
        <input type="text" bl-input [ngModel]="'26888888'">
      </div>
    </bl-input-group>
  `
})
export class BlTestInputGroupColComponent {
}
