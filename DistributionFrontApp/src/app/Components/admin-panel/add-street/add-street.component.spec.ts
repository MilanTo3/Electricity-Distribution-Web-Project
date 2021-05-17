import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStreetComponent } from './add-street.component';

describe('AddStreetComponent', () => {
  let component: AddStreetComponent;
  let fixture: ComponentFixture<AddStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
