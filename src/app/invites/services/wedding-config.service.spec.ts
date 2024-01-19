import { TestBed } from '@angular/core/testing';

import { WeddingConfigService } from './wedding-config.service';

describe('WeddingConfigService', () => {
  let service: WeddingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeddingConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
