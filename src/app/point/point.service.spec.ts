/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PointService } from './point.service';

describe('PointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointService]
    });
  });

  it('should ...', inject([PointService], (service: PointService) => {
    expect(service).toBeTruthy();
  }));
});
