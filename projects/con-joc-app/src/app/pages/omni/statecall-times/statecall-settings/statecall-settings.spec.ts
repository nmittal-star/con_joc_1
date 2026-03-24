import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatecallSettings } from './statecall-settings';

describe('StatecallSettings', () => {
  let component: StatecallSettings;
  let fixture: ComponentFixture<StatecallSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatecallSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatecallSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
