import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileRequestsComponent } from './admin-profile-requests.component';

describe('AdminProfileRequestsComponent', () => {
  let component: AdminProfileRequestsComponent;
  let fixture: ComponentFixture<AdminProfileRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
