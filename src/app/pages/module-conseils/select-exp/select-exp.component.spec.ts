import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExp2Component } from './select-exp.component';

describe('SelectExpComponent', () => {
  let component: SelectExp2Component;
  let fixture: ComponentFixture<SelectExp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
