import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIncidentsComponentComponent } from './my-incidents-component.component';

describe('MyIncidentsComponentComponent', () => {
  let component: MyIncidentsComponentComponent;
  let fixture: ComponentFixture<MyIncidentsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIncidentsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIncidentsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
