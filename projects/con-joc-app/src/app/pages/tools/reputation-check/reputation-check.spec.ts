import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationCheck } from './reputation-check';

describe('ReputationCheck', () => {
  let component: ReputationCheck;
  let fixture: ComponentFixture<ReputationCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReputationCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReputationCheck);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
