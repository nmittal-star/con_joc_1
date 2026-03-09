import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGroups } from './account-groups';

describe('AccountGroups', () => {
  let component: AccountGroups;
  let fixture: ComponentFixture<AccountGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountGroups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountGroups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
