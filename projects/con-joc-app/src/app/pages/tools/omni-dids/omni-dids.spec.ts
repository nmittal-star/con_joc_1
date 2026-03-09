import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniDids } from './omni-dids';

describe('OmniDids', () => {
  let component: OmniDids;
  let fixture: ComponentFixture<OmniDids>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmniDids]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmniDids);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
