/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParcoursDetailService } from './parcours-detail.service';

describe('ParcoursDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcoursDetailService]
    });
  });

  it('should ...', inject([ParcoursDetailService], (service: ParcoursDetailService) => {
    expect(service).toBeTruthy();
  }));
});
