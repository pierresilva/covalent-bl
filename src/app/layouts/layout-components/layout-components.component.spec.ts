import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponentsComponent } from './layout-components.component';

describe('LayoutComponentsComponent', () => {
  let component: LayoutComponentsComponent;
  let fixture: ComponentFixture<LayoutComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
