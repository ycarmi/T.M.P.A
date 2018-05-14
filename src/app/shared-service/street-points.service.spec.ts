import { TestBed, inject } from '@angular/core/testing';

import { StreetPointsService } from './street-points.service';

describe('StreetPointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetPointsService]
    });
  });

  it('should be created', inject([StreetPointsService], (service: StreetPointsService) => {
    expect(service).toBeTruthy();
  }));
});
