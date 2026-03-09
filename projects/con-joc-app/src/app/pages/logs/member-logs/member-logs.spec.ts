import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLogs } from './member-logs';

describe('MemberLogs', () => {
  let component: MemberLogs;
  let fixture: ComponentFixture<MemberLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
