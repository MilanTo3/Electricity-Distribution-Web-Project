import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartKarticaComponent } from './pie-chart-kartica.component';

describe('PieChartKarticaComponent', () => {
  let component: PieChartKarticaComponent;
  let fixture: ComponentFixture<PieChartKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartKarticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
