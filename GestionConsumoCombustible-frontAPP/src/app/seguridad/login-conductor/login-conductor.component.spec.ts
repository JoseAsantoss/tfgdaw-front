import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConductorComponent } from './login-conductor.component';

describe('LoginConductorComponent', () => {
  let component: LoginConductorComponent;
  let fixture: ComponentFixture<LoginConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginConductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
