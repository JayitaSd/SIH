import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPwdComponent } from './f-pwd.component';

describe('FPwdComponent', () => {
  let component: FPwdComponent;
  let fixture: ComponentFixture<FPwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FPwdComponent]
    });
    fixture = TestBed.createComponent(FPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
