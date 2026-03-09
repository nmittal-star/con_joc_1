import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionDelays } from './disposition-delays';

describe('DispositionDelays', () => {
  let component: DispositionDelays;
  let fixture: ComponentFixture<DispositionDelays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispositionDelays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispositionDelays);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
