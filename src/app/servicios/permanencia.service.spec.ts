import { TestBed } from '@angular/core/testing';

import { PermanenciaService } from './permanencia.service';

describe('PermanenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermanenciaService = TestBed.get(PermanenciaService);
    expect(service).toBeTruthy();
  });
});
