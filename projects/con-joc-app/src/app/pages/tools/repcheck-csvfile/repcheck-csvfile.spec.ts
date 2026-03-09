import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepcheckCsvfile } from './repcheck-csvfile';

describe('RepcheckCsvfile', () => {
  let component: RepcheckCsvfile;
  let fixture: ComponentFixture<RepcheckCsvfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepcheckCsvfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepcheckCsvfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
