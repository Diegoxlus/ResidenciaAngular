import { TestBed } from '@angular/core/testing';

import { DatosParteService } from './datos-parte.service';

describe('DatosParteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosParteService = TestBed.get(DatosParteService);
    expect(service).toBeTruthy();
  });
});
