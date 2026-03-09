import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistManagement } from './blacklist-management';

describe('BlacklistManagement', () => {
  let component: BlacklistManagement;
  let fixture: ComponentFixture<BlacklistManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlacklistManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
