import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCroissanceComponent } from './chart-croissance.component';

describe('ChartCroissanceComponent', () => {
  let component: ChartCroissanceComponent;
  let fixture: ComponentFixture<ChartCroissanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCroissanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCroissanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
