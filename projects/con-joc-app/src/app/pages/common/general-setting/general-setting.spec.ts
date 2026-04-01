import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSetting } from './general-setting';

describe('GeneralSetting', () => {
  let component: GeneralSetting;
  let fixture: ComponentFixture<GeneralSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralSetting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
