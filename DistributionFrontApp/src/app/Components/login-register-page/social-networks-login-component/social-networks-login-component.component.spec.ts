import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworksLoginComponentComponent } from './social-networks-login-component.component';

describe('SocialNetworksLoginComponentComponent', () => {
  let component: SocialNetworksLoginComponentComponent;
  let fixture: ComponentFixture<SocialNetworksLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialNetworksLoginComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworksLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
