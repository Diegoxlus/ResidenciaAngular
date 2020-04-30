import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNoticiasResidenteComponent } from './lista-noticias-residente.component';

describe('ListaNoticiasResidenteComponent', () => {
  let component: ListaNoticiasResidenteComponent;
  let fixture: ComponentFixture<ListaNoticiasResidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNoticiasResidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNoticiasResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
