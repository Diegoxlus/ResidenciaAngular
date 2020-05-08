import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPagosResidenteComponent } from './lista-pagos-residente.component';

describe('ListaPagosResidenteComponent', () => {
  let component: ListaPagosResidenteComponent;
  let fixture: ComponentFixture<ListaPagosResidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPagosResidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPagosResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
