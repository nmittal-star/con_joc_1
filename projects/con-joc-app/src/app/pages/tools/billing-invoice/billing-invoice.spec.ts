import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingInvoice } from './billing-invoice';

describe('BillingInvoice', () => {
  let component: BillingInvoice;
  let fixture: ComponentFixture<BillingInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
