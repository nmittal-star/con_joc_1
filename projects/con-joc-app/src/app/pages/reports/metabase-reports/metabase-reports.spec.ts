import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabaseReports } from './metabase-reports';

describe('MetabaseReports', () => {
  let component: MetabaseReports;
  let fixture: ComponentFixture<MetabaseReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetabaseReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetabaseReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
