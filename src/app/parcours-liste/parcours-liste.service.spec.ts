/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParcoursListeService } from './parcours-liste.service';

describe('ParcoursListeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcoursListeService]
    });
  });

  it('should ...', inject([ParcoursListeService], (service: ParcoursListeService) => {
    expect(service).toBeTruthy();
  }));
});
