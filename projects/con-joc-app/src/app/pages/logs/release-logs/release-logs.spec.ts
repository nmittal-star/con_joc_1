import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseLogs } from './release-logs';

describe('ReleaseLogs', () => {
  let component: ReleaseLogs;
  let fixture: ComponentFixture<ReleaseLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
