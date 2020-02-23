import { TestBed } from '@angular/core/testing';

import { DatosHabitacionService } from './datos-habitacion.service';

describe('DatosHabitacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosHabitacionService = TestBed.get(DatosHabitacionService);
    expect(service).toBeTruthy();
  });
});
