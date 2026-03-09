import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrCompare } from './cdr-compare';

describe('CdrCompare', () => {
  let component: CdrCompare;
  let fixture: ComponentFixture<CdrCompare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdrCompare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdrCompare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
