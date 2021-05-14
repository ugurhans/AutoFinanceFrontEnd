import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVerifyComponent } from './product-verify.component';

describe('ProductVerifyComponent', () => {
  let component: ProductVerifyComponent;
  let fixture: ComponentFixture<ProductVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
