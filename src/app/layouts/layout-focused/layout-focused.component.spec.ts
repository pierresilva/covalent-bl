import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFocusedComponent } from './layout-focused.component';

describe('LayoutFocusedComponent', () => {
  let component: LayoutFocusedComponent;
  let fixture: ComponentFixture<LayoutFocusedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutFocusedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFocusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
