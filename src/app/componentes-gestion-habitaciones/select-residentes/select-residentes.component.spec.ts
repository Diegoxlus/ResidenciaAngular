import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectResidentesComponent } from './select-residentes.component';

describe('SelectResidentesComponent', () => {
  let component: SelectResidentesComponent;
  let fixture: ComponentFixture<SelectResidentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectResidentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectResidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
