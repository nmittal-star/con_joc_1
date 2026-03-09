import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronManager } from './cron-manager';

describe('CronManager', () => {
  let component: CronManager;
  let fixture: ComponentFixture<CronManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
