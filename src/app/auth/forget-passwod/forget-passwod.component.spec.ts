import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswodComponent } from './forget-passwod.component';

describe('ForgetPasswodComponent', () => {
  let component: ForgetPasswodComponent;
  let fixture: ComponentFixture<ForgetPasswodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswodComponent]
    });
    fixture = TestBed.createComponent(ForgetPasswodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
