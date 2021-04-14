import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartKarticaComponent } from './line-chart-kartica.component';

describe('LineChartKarticaComponent', () => {
  let component: LineChartKarticaComponent;
  let fixture: ComponentFixture<LineChartKarticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartKarticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartKarticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
