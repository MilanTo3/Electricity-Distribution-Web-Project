import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStateChangesComponent } from './history-state-changes.component';

describe('HistoryStateChangesComponent', () => {
  let component: HistoryStateChangesComponent;
  let fixture: ComponentFixture<HistoryStateChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryStateChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryStateChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
