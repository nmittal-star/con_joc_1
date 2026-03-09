import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRates } from './provider-rates';

describe('ProviderRates', () => {
  let component: ProviderRates;
  let fixture: ComponentFixture<ProviderRates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderRates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderRates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
