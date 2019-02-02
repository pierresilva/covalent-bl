import { Component } from '@angular/core';
import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BlInputDirective } from './bl-input.directive';
import { BlInputModule } from './bl-input.module';

describe('input', () => {
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ BlInputModule, FormsModule, ReactiveFormsModule ],
      declarations: [ BlTestInputWithInputComponent, BlTestInputWithTextAreaComponent, BlTestInputFormComponent ],
      providers   : []
    }).compileComponents();
  }));
  describe('single input', () => {
    describe('input with input element', () => {
      let inputElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(BlInputDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('bl-input');
      });
      it('should disabled work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('bl-input-disabled');
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('bl-input-disabled');
      });
      it('should blSize work', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('bl-input');
        expect(inputElement.nativeElement.classList).toContain('bl-input-sm');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('bl-input');
        expect(inputElement.nativeElement.classList).toContain('bl-input-lg');
      });
    });
    describe('input with textarea element', () => {
      let inputElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(BlInputDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('bl-input');
      });
    });
  });
  describe('input form', () => {
    describe('input with form', () => {
      let inputElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputFormComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(BlInputDirective));
      });
      it('should set disabled work', fakeAsync(() => {
        flush();
        expect(inputElement.nativeElement.classList).not.toContain('bl-input-disabled');
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('bl-input-disabled');
      }));
    });
  });
});

@Component({
  selector: 'bl-test-input-with-input',
  template: `<input bl-input [blSize]="size" [disabled]="disabled">`
})
export class BlTestInputWithInputComponent {
  size = 'default';
  disabled = false;
}

@Component({
  selector: 'bl-test-input-with-textarea',
  template: `<textarea bl-input></textarea>`
})
export class BlTestInputWithTextAreaComponent {
}

@Component({
  selector: 'bl-test-input-form',
  template: `
    <form [formGroup]="formGroup">
      <input bl-input formControlName="input">
    </form>
  `
})
export class BlTestInputFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: [ 'abc' ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
