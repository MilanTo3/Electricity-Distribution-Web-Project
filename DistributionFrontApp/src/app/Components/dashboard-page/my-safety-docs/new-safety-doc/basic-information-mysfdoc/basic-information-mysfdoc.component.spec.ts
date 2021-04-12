import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationMysfdocComponent } from './basic-information-mysfdoc.component';

describe('BasicInformationMysfdocComponent', () => {
  let component: BasicInformationMysfdocComponent;
  let fixture: ComponentFixture<BasicInformationMysfdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInformationMysfdocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationMysfdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
