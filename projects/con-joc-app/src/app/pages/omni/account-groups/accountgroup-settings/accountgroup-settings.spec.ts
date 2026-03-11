import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountgroupSettings } from './accountgroup-settings';

describe('AccountgroupSettings', () => {
  let component: AccountgroupSettings;
  let fixture: ComponentFixture<AccountgroupSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountgroupSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountgroupSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
