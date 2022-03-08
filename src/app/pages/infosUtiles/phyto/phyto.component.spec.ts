import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhytoComponent } from './phyto.component';

describe('PhytoComponent', () => {
  let component: PhytoComponent;
  let fixture: ComponentFixture<PhytoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhytoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhytoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
