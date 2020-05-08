import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermanenciaFindeComponent } from './lista-permanencia-finde.component';

describe('ListaPermanenciaFindeComponent', () => {
  let component: ListaPermanenciaFindeComponent;
  let fixture: ComponentFixture<ListaPermanenciaFindeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPermanenciaFindeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPermanenciaFindeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
