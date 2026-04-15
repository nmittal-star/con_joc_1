import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialerSettings } from './dialer-settings';

describe('DialerSettings', () => {
  let component: DialerSettings;
  let fixture: ComponentFixture<DialerSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialerSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialerSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
