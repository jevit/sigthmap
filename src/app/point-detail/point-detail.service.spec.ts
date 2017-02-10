/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PointDetailService } from './point-detail.service';

describe('PointDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointDetailService]
    });
  });

  it('should ...', inject([PointDetailService], (service: PointDetailService) => {
    expect(service).toBeTruthy();
  }));
});
