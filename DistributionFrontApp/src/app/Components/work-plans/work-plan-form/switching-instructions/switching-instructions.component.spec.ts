import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchingInstructionsComponent } from './switching-instructions.component';

describe('SwitchingInstructionsComponent', () => {
  let component: SwitchingInstructionsComponent;
  let fixture: ComponentFixture<SwitchingInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchingInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
