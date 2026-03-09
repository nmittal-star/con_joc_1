import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidLogs } from './did-logs';

describe('DidLogs', () => {
  let component: DidLogs;
  let fixture: ComponentFixture<DidLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DidLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DidLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
