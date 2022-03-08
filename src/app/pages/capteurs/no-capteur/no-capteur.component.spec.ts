import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCapteurComponent } from './no-capteur.component';

describe('NoCapteurComponent', () => {
  let component: NoCapteurComponent;
  let fixture: ComponentFixture<NoCapteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCapteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCapteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
