import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLists } from './email-lists';

describe('EmailLists', () => {
  let component: EmailLists;
  let fixture: ComponentFixture<EmailLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
