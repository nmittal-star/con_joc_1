import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidOrders } from './did-orders';

describe('DidOrders', () => {
  let component: DidOrders;
  let fixture: ComponentFixture<DidOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DidOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DidOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
