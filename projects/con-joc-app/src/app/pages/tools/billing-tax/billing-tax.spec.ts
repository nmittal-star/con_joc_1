import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingTax } from './billing-tax';

describe('BillingTax', () => {
  let component: BillingTax;
  let fixture: ComponentFixture<BillingTax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingTax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingTax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
