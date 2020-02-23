import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorEditComponent } from './trabajador-edit.component';

describe('TrabajadorEditComponent', () => {
  let component: TrabajadorEditComponent;
  let fixture: ComponentFixture<TrabajadorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajadorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
