import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LergUpdate } from './lerg-update';

describe('LergUpdate', () => {
  let component: LergUpdate;
  let fixture: ComponentFixture<LergUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LergUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LergUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
