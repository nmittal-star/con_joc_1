import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemStatusLogs } from './system-status-logs';

describe('SystemStatusLogs', () => {
  let component: SystemStatusLogs;
  let fixture: ComponentFixture<SystemStatusLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemStatusLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemStatusLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
