import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponentComponent } from './devices-component.component';

describe('DevicesComponentComponent', () => {
  let component: DevicesComponentComponent;
  let fixture: ComponentFixture<DevicesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
