import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicioComponent } from './pagina-inicio-component';

describe('PaginaInicioComponent', () => {
  let component: PaginaInicioComponent;
  let fixture: ComponentFixture<PaginaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
