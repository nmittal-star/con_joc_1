import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseStatuses } from './database-statuses';

describe('DatabaseStatuses', () => {
  let component: DatabaseStatuses;
  let fixture: ComponentFixture<DatabaseStatuses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseStatuses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseStatuses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
