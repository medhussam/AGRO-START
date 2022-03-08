import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExpComponent } from './select-exp.component';

describe('SelectExpComponent', () => {
  let component: SelectExpComponent;
  let fixture: ComponentFixture<SelectExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
