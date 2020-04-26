import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnotarseComidaComponent } from './lista-anotarse-comida.component';

describe('ListaAnotarseComidaComponent', () => {
  let component: ListaAnotarseComidaComponent;
  let fixture: ComponentFixture<ListaAnotarseComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAnotarseComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnotarseComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
