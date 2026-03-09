import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedQueries } from './locked-queries';

describe('LockedQueries', () => {
  let component: LockedQueries;
  let fixture: ComponentFixture<LockedQueries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockedQueries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockedQueries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
