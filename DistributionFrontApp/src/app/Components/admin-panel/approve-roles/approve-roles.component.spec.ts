import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRolesComponent } from './approve-roles.component';

describe('ApproveRolesComponent', () => {
  let component: ApproveRolesComponent;
  let fixture: ComponentFixture<ApproveRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
