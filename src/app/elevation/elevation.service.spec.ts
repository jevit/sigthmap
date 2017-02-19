/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElevationService } from './elevation.service';

describe('ElevationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElevationService]
    });
  });

  it('should ...', inject([ElevationService], (service: ElevationService) => {
    expect(service).toBeTruthy();
  }));
});
