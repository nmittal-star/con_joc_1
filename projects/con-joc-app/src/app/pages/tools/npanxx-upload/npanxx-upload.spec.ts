import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpanxxUpload } from './npanxx-upload';

describe('NpanxxUpload', () => {
  let component: NpanxxUpload;
  let fixture: ComponentFixture<NpanxxUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpanxxUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpanxxUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
