import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPagesComponent } from './select-pages.component';

describe('SelectPagesComponent', () => {
  let component: SelectPagesComponent;
  let fixture: ComponentFixture<SelectPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
