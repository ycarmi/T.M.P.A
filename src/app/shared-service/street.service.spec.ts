import { TestBed, inject } from '@angular/core/testing';

import { StreetService } from './street.service';

describe('StreetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetService]
    });
  });

  it('should be created', inject([StreetService], (service: StreetService) => {
    expect(service).toBeTruthy();
  }));
});
