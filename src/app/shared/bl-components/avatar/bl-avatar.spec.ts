import { Component, DebugElement, ViewChild } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BlIconModule } from '../icon/bl-icon.module';

import { BlAvatarComponent } from './bl-avatar.component';
import { BlAvatarModule } from './bl-avatar.module';

function getType(dl: DebugElement): string {
  const el = dl.nativeElement as HTMLElement;
  if (el.querySelector('img') != null) { return 'image'; }
  if (el.querySelector('.anticon') != null) { return 'icon'; }
  return el.innerText.trim().length === 0 ? '' : 'text';
}

describe('avatar', () => {
  let fixture: ComponentFixture<TestAvatarComponent>;
  let context: TestAvatarComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BlAvatarModule, BlIconModule ],
      declarations: [ TestAvatarComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAvatarComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#blSrc', () => {
    it('#blSrc', () => {
      expect(context).not.toBeNull();
    });
    it('should tolerate error src', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.blSrc = '';
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
      expect(context.comp.hasSrc).toBe(false);
      context.blSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
      tick();
      fixture.detectChanges();
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
      tick();
    }));
  });

  it('#blIcon', () => {
    context.blSrc = null;
    context.blText = null;
    fixture.detectChanges();
    expect(getType(dl)).toBe('icon');
  });

  describe('#blText', () => {
    beforeEach(() => {
      context.blSrc = null;
      context.blIcon = null;
      fixture.detectChanges();
    });
    it('property', () => {
      expect(getType(dl)).toBe('text');
    });
    it('should be normal font-size', fakeAsync(() => {
      context.blText = 'a';
      fixture.detectChanges();
      tick();
      const scale = +/(\w+)\(([^)]*)\)/g.exec(dl.nativeElement.querySelector('.ant-avatar-string').style.transform)[2];
      expect(scale).toBe(1);
    }));
    it('should be autoset font-size', fakeAsync(() => {
      context.blText = 'LongUsername';
      fixture.detectChanges();
      tick();
      const scale = +/(\w+)\(([^)]*)\)/g.exec(dl.nativeElement.querySelector('.ant-avatar-string').style.transform)[2];
      expect(scale).toBeLessThan(1);
    }));
  });

  describe('#blShape', () => {
    for (const type of [ 'square', 'circle' ]) {
      it(type, () => {
        context.blShape = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-avatar-${type}`)) !== null).toBe(true);
      });
    }
  });

  describe('#blSize', () => {
    for (const item of [ { size: 'large', cls: 'lg'}, { size: 'small', cls: 'sm'} ]) {
      it(item.size, () => {
        context.blSize = item.size;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-avatar-${item.cls}`)) !== null).toBe(true);
      });
    }

    it('custom size', () => {
      context.blSize = 64;
      context.blIcon = null;
      context.blSrc = null;
      fixture.detectChanges();
      const size = `${64}px`;
      const hostStyle = dl.nativeElement.querySelector('bl-avatar').style;
      expect(hostStyle.height === size).toBe(true);
      expect(hostStyle.width === size).toBe(true);
      expect(hostStyle.lineHeight === size).toBe(true);
      expect(hostStyle.fontSize === ``).toBe(true);

      context.blIcon = 'user';
      fixture.detectChanges();
      expect(hostStyle.fontSize === `${context.blSize / 2}px`).toBe(true);
    });

  });

  describe('order: image > icon > text', () => {
    it('image priority', () => {
      expect(getType(dl)).toBe('image');
    });
    it('should be show icon when image loaded error and icon exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('icon');
    }));
    it('should be show text when image loaded error and icon not exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.blIcon = null;
      fixture.detectChanges();
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('text');
    }));
    it('should be show empty when image loaded error and icon & text not exists', fakeAsync(() => {
      expect(getType(dl)).toBe('image');
      context.blIcon = null;
      context.blText = null;
      fixture.detectChanges();
      context.comp.imgError();
      tick();
      fixture.detectChanges();
      expect(getType(dl)).toBe('');
    }));
  });
});

@Component({
  template: `
  <bl-avatar #comp
    [blShape]="blShape"
    [blSize]="blSize"
    [blIcon]="blIcon"
    [blText]="blText"
    [blSrc]="blSrc"></bl-avatar>
  `,
  styleUrls: [ './style/index.less' ]
})
class TestAvatarComponent {
  @ViewChild('comp') comp: BlAvatarComponent;
  blShape = 'square';
  blSize: string | number = 'large';
  blIcon = 'anticon anticon-user';
  blText = 'A';
  blSrc = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==`;
}
