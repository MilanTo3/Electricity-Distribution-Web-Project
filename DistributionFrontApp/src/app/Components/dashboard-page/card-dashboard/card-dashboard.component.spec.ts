import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardComponent } from './card-dashboard.component';

describe('CardDashboardComponent', () => {
  let component: CardDashboardComponent;
  let fixture: ComponentFixture<CardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
