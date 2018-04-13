import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarProgramManagerComponent } from './navigation-bar-program-manager.component';

describe('NavigationBarProgramManagerComponent', () => {
  let component: NavigationBarProgramManagerComponent;
  let fixture: ComponentFixture<NavigationBarProgramManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarProgramManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarProgramManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
