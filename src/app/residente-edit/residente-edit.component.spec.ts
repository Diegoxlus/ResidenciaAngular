import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenteEditComponent } from './residente-edit.component';

describe('ResidenteEditComponent', () => {
  let component: ResidenteEditComponent;
  let fixture: ComponentFixture<ResidenteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
