import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChangeMysfdcComponent } from './history-change-mysfdc.component';

describe('HistoryChangeMysfdcComponent', () => {
  let component: HistoryChangeMysfdcComponent;
  let fixture: ComponentFixture<HistoryChangeMysfdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryChangeMysfdcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChangeMysfdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
