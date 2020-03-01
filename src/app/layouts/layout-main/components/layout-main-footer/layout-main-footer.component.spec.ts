import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainFooterComponent } from './layout-main-footer.component';

describe('LayoutMainFooterComponent', () => {
  let component: LayoutMainFooterComponent;
  let fixture: ComponentFixture<LayoutMainFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMainFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
