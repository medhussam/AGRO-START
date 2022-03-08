import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmodalParcelleComponent } from './addmodal-parcelle.component';

describe('AddmodalParcelleComponent', () => {
  let component: AddmodalParcelleComponent;
  let fixture: ComponentFixture<AddmodalParcelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmodalParcelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmodalParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
