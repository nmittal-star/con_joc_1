import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyTransfer } from './emergency-transfer';

describe('EmergencyTransfer', () => {
  let component: EmergencyTransfer;
  let fixture: ComponentFixture<EmergencyTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyTransfer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyTransfer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
