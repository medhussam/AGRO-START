import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorychartComponent } from './historychart.component';

describe('HistorychartComponent', () => {
  let component: HistorychartComponent;
  let fixture: ComponentFixture<HistorychartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorychartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
