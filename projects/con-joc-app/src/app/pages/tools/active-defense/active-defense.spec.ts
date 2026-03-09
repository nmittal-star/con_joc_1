import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDefense } from './active-defense';

describe('ActiveDefense', () => {
  let component: ActiveDefense;
  let fixture: ComponentFixture<ActiveDefense>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveDefense]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveDefense);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
