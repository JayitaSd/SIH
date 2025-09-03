import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropInfoFormComponent } from './crop-info-form.component';

describe('CropInfoFormComponent', () => {
  let component: CropInfoFormComponent;
  let fixture: ComponentFixture<CropInfoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropInfoFormComponent]
    });
    fixture = TestBed.createComponent(CropInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
