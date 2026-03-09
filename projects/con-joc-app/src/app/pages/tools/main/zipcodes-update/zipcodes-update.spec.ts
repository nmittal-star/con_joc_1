import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodesUpdate } from './zipcodes-update';

describe('ZipcodesUpdate', () => {
  let component: ZipcodesUpdate;
  let fixture: ComponentFixture<ZipcodesUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZipcodesUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZipcodesUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
