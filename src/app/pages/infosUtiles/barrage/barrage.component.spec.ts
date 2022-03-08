import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrageComponent } from './barrage.component';

describe('BarrageComponent', () => {
  let component: BarrageComponent;
  let fixture: ComponentFixture<BarrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
