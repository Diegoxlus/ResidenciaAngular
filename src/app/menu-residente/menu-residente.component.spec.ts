import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuResidenteComponent } from './menu-residente.component';

describe('MenuResidenteComponent', () => {
  let component: MenuResidenteComponent;
  let fixture: ComponentFixture<MenuResidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuResidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
