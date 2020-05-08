import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermanenciaPropiaFindeComponent } from './lista-permanencia-propia-finde.component';

describe('ListaPermanenciaPropiaFindeComponent', () => {
  let component: ListaPermanenciaPropiaFindeComponent;
  let fixture: ComponentFixture<ListaPermanenciaPropiaFindeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPermanenciaPropiaFindeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPermanenciaPropiaFindeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
