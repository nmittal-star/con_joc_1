import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHighlighted } from './view-highlighted';

describe('ViewHighlighted', () => {
  let component: ViewHighlighted;
  let fixture: ComponentFixture<ViewHighlighted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHighlighted]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHighlighted);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
