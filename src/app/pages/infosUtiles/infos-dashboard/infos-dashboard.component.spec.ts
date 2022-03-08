import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosDashboardComponent } from './infos-dashboard.component';

describe('InfosDashboardComponent', () => {
  let component: InfosDashboardComponent;
  let fixture: ComponentFixture<InfosDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
