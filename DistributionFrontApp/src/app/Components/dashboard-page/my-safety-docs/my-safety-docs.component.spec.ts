import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySafetyDocsComponent } from './my-safety-docs.component';

describe('MySafetyDocsComponent', () => {
  let component: MySafetyDocsComponent;
  let fixture: ComponentFixture<MySafetyDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySafetyDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySafetyDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
