import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaTools } from './mfa-tools';

describe('MfaTools', () => {
  let component: MfaTools;
  let fixture: ComponentFixture<MfaTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfaTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfaTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
