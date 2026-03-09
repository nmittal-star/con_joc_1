import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniAcl } from './omni-acl';

describe('OmniAcl', () => {
  let component: OmniAcl;
  let fixture: ComponentFixture<OmniAcl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmniAcl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmniAcl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
