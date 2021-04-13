import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistMysfdcComponent } from './checklist-mysfdc.component';

describe('ChecklistMysfdcComponent', () => {
  let component: ChecklistMysfdcComponent;
  let fixture: ComponentFixture<ChecklistMysfdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistMysfdcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistMysfdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
