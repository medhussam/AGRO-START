import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDrawParcelleComponent } from './map-draw-parcelle.component';

describe('MapDrawParcelleComponent', () => {
  let component: MapDrawParcelleComponent;
  let fixture: ComponentFixture<MapDrawParcelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDrawParcelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDrawParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
