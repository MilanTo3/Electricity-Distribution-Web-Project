import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedListComponent } from './employed-list.component';

describe('EmployedListComponent', () => {
  let component: EmployedListComponent;
  let fixture: ComponentFixture<EmployedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
