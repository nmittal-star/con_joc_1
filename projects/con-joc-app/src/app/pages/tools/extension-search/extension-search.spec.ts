import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionSearch } from './extension-search';

describe('ExtensionSearch', () => {
  let component: ExtensionSearch;
  let fixture: ComponentFixture<ExtensionSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
