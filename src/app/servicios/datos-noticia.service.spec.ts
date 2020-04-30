import { TestBed } from '@angular/core/testing';

import { DatosNoticiaService } from './datos-noticia.service';

describe('DatosNoticiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosNoticiaService = TestBed.get(DatosNoticiaService);
    expect(service).toBeTruthy();
  });
});
