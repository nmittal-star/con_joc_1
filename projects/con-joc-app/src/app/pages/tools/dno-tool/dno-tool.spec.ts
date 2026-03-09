import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnoTool } from './dno-tool';

describe('DnoTool', () => {
  let component: DnoTool;
  let fixture: ComponentFixture<DnoTool>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DnoTool]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnoTool);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
