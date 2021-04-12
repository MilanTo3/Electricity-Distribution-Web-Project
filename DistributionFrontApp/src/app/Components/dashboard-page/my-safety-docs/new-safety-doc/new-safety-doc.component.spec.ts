import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSafetyDocComponent } from './new-safety-doc.component';

describe('NewSafetyDocComponent', () => {
  let component: NewSafetyDocComponent;
  let fixture: ComponentFixture<NewSafetyDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSafetyDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSafetyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
