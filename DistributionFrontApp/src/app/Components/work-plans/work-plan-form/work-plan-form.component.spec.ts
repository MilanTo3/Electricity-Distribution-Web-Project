import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPlanFormComponent } from './work-plan-form.component';

describe('WorkPlanFormComponent', () => {
  let component: WorkPlanFormComponent;
  let fixture: ComponentFixture<WorkPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
