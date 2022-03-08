import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCompteComponent } from './popup-compte.component';

describe('PopupCompteComponent', () => {
  let component: PopupCompteComponent;
  let fixture: ComponentFixture<PopupCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
