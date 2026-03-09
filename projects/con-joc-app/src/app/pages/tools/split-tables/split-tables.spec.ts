import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitTables } from './split-tables';

describe('SplitTables', () => {
  let component: SplitTables;
  let fixture: ComponentFixture<SplitTables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitTables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitTables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
