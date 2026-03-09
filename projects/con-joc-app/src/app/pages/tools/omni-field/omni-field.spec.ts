import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniField } from './omni-field';

describe('OmniField', () => {
  let component: OmniField;
  let fixture: ComponentFixture<OmniField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmniField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmniField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
