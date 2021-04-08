import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationFPComponent } from './basic-information-fp.component';

describe('BasicInformationFPComponent', () => {
  let component: BasicInformationFPComponent;
  let fixture: ComponentFixture<BasicInformationFPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInformationFPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationFPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
