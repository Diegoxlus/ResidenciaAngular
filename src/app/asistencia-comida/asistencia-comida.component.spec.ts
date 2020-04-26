import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaComidaComponent } from './asistencia-comida.component';

describe('AsistenciaComidaComponent', () => {
  let component: AsistenciaComidaComponent;
  let fixture: ComponentFixture<AsistenciaComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
