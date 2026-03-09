import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedisSearch } from './redis-search';

describe('RedisSearch', () => {
  let component: RedisSearch;
  let fixture: ComponentFixture<RedisSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedisSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedisSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
