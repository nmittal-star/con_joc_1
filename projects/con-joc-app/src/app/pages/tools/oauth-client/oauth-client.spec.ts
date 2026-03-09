import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthClient } from './oauth-client';

describe('OauthClient', () => {
  let component: OauthClient;
  let fixture: ComponentFixture<OauthClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
