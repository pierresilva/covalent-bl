import { Component, ViewEncapsulation } from '@angular/core';
import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BlAutoResizeDirective } from './bl-autoresize.directive';
import { BlInputModule } from './bl-input.module';

describe('autoresize', () => {
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ BlInputModule, FormsModule, ReactiveFormsModule ],
      declarations: [ BlTestInputWithTextAreaAutoSizeStringComponent, BlTestInputWithTextAreaAutoSizeObjectComponent ],
      providers   : []
    }).compileComponents();
  }));
  describe('single input', () => {
    describe('textarea autosize string', () => {
      let textarea;
      let autosize;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputWithTextAreaAutoSizeStringComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(BlAutoResizeDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(BlAutoResizeDirective)).injector.get(BlAutoResizeDirective);
      });
      it('should resize the textarea based on its ngModel', fakeAsync(() => {
        let previousHeight = textarea.clientHeight;
        testComponent.value = `
    Once upon a midnight dreary, while I pondered, weak and weary,
    Over many a quaint and curious volume of forgotten lore—
        While I nodded, nearly napping, suddenly there came a tapping,
    As of some one gently rapping, rapping at my chamber door.
    “’Tis some visitor,” I muttered, “tapping at my chamber door—
                Only this and nothing more.”`;
        flush();
        // Manually call resizeTextArea instead of faking an `input` event.
        fixture.detectChanges();
        flush();
        autosize.resizeToFitContent();

        expect(textarea.clientHeight)
        .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with added content.');
        expect(textarea.clientHeight)
        .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');

        previousHeight = textarea.clientHeight;
        testComponent.value += `
        Ah, distinctly I remember it was in the bleak December;
    And each separate dying ember wrought its ghost upon the floor.
        Eagerly I wished the morrow;—vainly I had sought to borrow
        From my books surcease of sorrow—sorrow for the lost Lenore—
    For the rare and radibl maiden whom the angels name Lenore—
                Nameless here for evermore.`;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        expect(textarea.clientHeight)
        .toBeGreaterThan(previousHeight, 'Expected textarea to have grown with added content.');
        expect(textarea.clientHeight)
        .toBe(textarea.scrollHeight, 'Expected textarea height to match its scrollHeight');
      }));
    });
    describe('textarea autosize object', () => {
      let textarea;
      let autosize;
      beforeEach(() => {
        fixture = TestBed.createComponent(BlTestInputWithTextAreaAutoSizeObjectComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        textarea = fixture.debugElement.query(By.directive(BlAutoResizeDirective)).nativeElement;
        autosize = fixture.debugElement.query(By.directive(BlAutoResizeDirective)).injector.get(BlAutoResizeDirective);
      });
      it('should set a min-height based on minRows', fakeAsync(() => {
        autosize.resizeToFitContent(true);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        const previousMinHeight = parseInt(textarea.style.minHeight as string, 10);
        testComponent.minRows = 6;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        expect(parseInt(textarea.style.minHeight as string, 10))
        .toBeGreaterThan(previousMinHeight, 'Expected increased min-height with minRows increase.');
      }));

      it('should set a max-height based on maxRows', fakeAsync(() => {
        autosize.resizeToFitContent(true);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        const previousMaxHeight = parseInt(textarea.style.maxHeight as string, 10);
        testComponent.maxRows = 6;
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        autosize.resizeToFitContent(true);
        expect(parseInt(textarea.style.maxHeight as string, 10))
        .toBeGreaterThan(previousMaxHeight, 'Expected increased max-height with maxRows increase.');
      }));
    });
  });
});

@Component({
  selector: 'bl-test-input-with-textarea-autosize-string',
  template: `<textarea bl-input blAutosize [ngModel]="value"></textarea>`,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      textarea.cdk-textarea-autosize-measuring {
        height: auto !importbl;
        overflow: hidden !importbl;
        padding: 2px 0 !importbl;
        box-sizing: content-box !importbl;
      }
    `
  ]
})
export class BlTestInputWithTextAreaAutoSizeStringComponent {
  value = '';
}

@Component({
  selector: 'bl-test-input-with-textarea-autosize-object',
  template: `<textarea bl-input ngModel [blAutosize]="{ minRows: minRows, maxRows: maxRows }"></textarea>`,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      textarea.cdk-textarea-autosize-measuring {
        height: auto !importbl;
        overflow: hidden !importbl;
        padding: 2px 0 !importbl;
        box-sizing: content-box !importbl;
      }
    `
  ]
})
export class BlTestInputWithTextAreaAutoSizeObjectComponent {
  minRows = 2;
  maxRows = 2;
}
