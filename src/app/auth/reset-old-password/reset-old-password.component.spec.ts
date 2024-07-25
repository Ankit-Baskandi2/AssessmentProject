import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetOldPasswordComponent } from './reset-old-password.component';

describe('ResetOldPasswordComponent', () => {
  let component: ResetOldPasswordComponent;
  let fixture: ComponentFixture<ResetOldPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetOldPasswordComponent]
    });
    fixture = TestBed.createComponent(ResetOldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
