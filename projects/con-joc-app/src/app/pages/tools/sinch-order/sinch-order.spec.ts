import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinchOrder } from './sinch-order';

describe('SinchOrder', () => {
  let component: SinchOrder;
  let fixture: ComponentFixture<SinchOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinchOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinchOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
