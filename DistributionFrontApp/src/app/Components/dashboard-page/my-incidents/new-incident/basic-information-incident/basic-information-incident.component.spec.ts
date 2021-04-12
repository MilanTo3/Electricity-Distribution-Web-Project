import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationIncidentComponent } from './basic-information-incident.component';

describe('BasicInformationIncidentComponent', () => {
  let component: BasicInformationIncidentComponent;
  let fixture: ComponentFixture<BasicInformationIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInformationIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
