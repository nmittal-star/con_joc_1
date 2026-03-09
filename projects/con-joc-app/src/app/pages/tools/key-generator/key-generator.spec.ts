import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyGenerator } from './key-generator';

describe('KeyGenerator', () => {
  let component: KeyGenerator;
  let fixture: ComponentFixture<KeyGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
