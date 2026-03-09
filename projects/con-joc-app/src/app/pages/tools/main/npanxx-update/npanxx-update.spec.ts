import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpanxxUpdate } from './npanxx-update';

describe('NpanxxUpdate', () => {
  let component: NpanxxUpdate;
  let fixture: ComponentFixture<NpanxxUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpanxxUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpanxxUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
