import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPage } from './view-page';

describe('ViewPage', () => {
  let component: ViewPage;
  let fixture: ComponentFixture<ViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
