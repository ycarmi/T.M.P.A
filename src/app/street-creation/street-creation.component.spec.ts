import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetsCreationComponent } from './streets-creation.component';

describe('StreetsCreationComponent', () => {
  let component: StreetsCreationComponent;
  let fixture: ComponentFixture<StreetsCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetsCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
