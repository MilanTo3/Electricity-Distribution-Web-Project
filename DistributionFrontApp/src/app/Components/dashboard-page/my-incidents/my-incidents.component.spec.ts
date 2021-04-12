import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIncidentsComponent } from './my-incidents.component';

describe('TableDashboardComponent', () => {
  let component: MyIncidentsComponent;
  let fixture: ComponentFixture<MyIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIncidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
