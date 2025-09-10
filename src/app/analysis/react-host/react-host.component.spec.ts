import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactHostComponent } from './react-host.component';

describe('ReactHostComponent', () => {
  let component: ReactHostComponent;
  let fixture: ComponentFixture<ReactHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactHostComponent]
    });
    fixture = TestBed.createComponent(ReactHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
