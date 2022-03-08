import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipYAxisComponent } from './multip-y-axis.component';

describe('MultipYAxisComponent', () => {
  let component: MultipYAxisComponent;
  let fixture: ComponentFixture<MultipYAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipYAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipYAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
