import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTracker } from './state-tracker';

describe('StateTracker', () => {
  let component: StateTracker;
  let fixture: ComponentFixture<StateTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
