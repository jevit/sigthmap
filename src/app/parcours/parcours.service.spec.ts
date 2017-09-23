/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParcoursService } from './parcours.service';

describe('ParcoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcoursService]
    });
  });

  it('should ...', inject([ParcoursService], (service: ParcoursService) => {
    expect(service).toBeTruthy();
  }));
});
