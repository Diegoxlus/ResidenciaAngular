import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsistenciaComidaComponent } from './lista-asistencia-comida.component';

describe('ListaAsistenciaComidaComponent', () => {
  let component: ListaAsistenciaComidaComponent;
  let fixture: ComponentFixture<ListaAsistenciaComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAsistenciaComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAsistenciaComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
