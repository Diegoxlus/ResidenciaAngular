import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComidaComponent } from './modal-comida.component';

describe('ModalComidaComponent', () => {
  let component: ModalComidaComponent;
  let fixture: ComponentFixture<ModalComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
