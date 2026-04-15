import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuoraShell } from './zuora-shell';

describe('ZuoraShell', () => {
  let component: ZuoraShell;
  let fixture: ComponentFixture<ZuoraShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZuoraShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZuoraShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
