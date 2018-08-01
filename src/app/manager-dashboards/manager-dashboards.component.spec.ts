import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardsComponent } from './manager-dashboards.component';

describe('ManagerDashboardsComponent', () => {
  let component: ManagerDashboardsComponent;
  let fixture: ComponentFixture<ManagerDashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDashboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
