import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaProject } from './va-project';

describe('VaProject', () => {
  let component: VaProject;
  let fixture: ComponentFixture<VaProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
