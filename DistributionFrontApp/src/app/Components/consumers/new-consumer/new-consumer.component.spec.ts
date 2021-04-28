import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsumerComponent } from './new-consumer.component';

describe('NewConsumerComponent', () => {
  let component: NewConsumerComponent;
  let fixture: ComponentFixture<NewConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConsumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
