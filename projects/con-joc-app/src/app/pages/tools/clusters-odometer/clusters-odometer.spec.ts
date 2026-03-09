import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClustersOdometer } from './clusters-odometer';

describe('ClustersOdometer', () => {
  let component: ClustersOdometer;
  let fixture: ComponentFixture<ClustersOdometer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClustersOdometer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClustersOdometer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
