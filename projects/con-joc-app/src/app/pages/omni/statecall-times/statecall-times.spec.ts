import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatecallTimes } from './statecall-times';

describe('StatecallTimes', () => {
  let component: StatecallTimes;
  let fixture: ComponentFixture<StatecallTimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatecallTimes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatecallTimes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
