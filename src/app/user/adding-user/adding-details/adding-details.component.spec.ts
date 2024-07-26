import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingDetailsComponent } from './adding-details.component';

describe('AddingDetailsComponent', () => {
  let component: AddingDetailsComponent;
  let fixture: ComponentFixture<AddingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddingDetailsComponent]
    });
    fixture = TestBed.createComponent(AddingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
