import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuoraBilling } from './zuora-billing';

describe('ZuoraBilling', () => {
  let component: ZuoraBilling;
  let fixture: ComponentFixture<ZuoraBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZuoraBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZuoraBilling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
