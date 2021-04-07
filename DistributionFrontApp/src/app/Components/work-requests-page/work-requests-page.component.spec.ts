import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRequestsPageComponent } from './work-requests-page.component';

describe('WorkRequestsPageComponent', () => {
  let component: WorkRequestsPageComponent;
  let fixture: ComponentFixture<WorkRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRequestsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
