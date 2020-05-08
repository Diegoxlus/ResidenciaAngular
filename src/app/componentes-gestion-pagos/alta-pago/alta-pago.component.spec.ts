import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPagoComponent } from './alta-pago.component';

describe('AltaPagoComponent', () => {
  let component: AltaPagoComponent;
  let fixture: ComponentFixture<AltaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
