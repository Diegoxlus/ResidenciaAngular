import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartesComponent } from './edit-partes.component';

describe('EditPartesComponent', () => {
  let component: EditPartesComponent;
  let fixture: ComponentFixture<EditPartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
