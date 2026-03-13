import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDidorders } from './view-didorders';

describe('ViewDidorders', () => {
  let component: ViewDidorders;
  let fixture: ComponentFixture<ViewDidorders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDidorders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDidorders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
