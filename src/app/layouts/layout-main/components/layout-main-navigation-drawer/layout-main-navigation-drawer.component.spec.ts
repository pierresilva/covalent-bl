import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainNavigationDrawerComponent } from './layout-main-navigation-drawer.component';

describe('LayoutMainNavigationDrawerComponent', () => {
  let component: LayoutMainNavigationDrawerComponent;
  let fixture: ComponentFixture<LayoutMainNavigationDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMainNavigationDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainNavigationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
