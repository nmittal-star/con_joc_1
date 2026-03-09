import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOns } from './add-ons';

describe('AddOns', () => {
  let component: AddOns;
  let fixture: ComponentFixture<AddOns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
