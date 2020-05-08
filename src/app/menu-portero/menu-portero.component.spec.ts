import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPorteroComponent } from './menu-portero.component';

describe('MenuPorteroComponent', () => {
  let component: MenuPorteroComponent;
  let fixture: ComponentFixture<MenuPorteroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPorteroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPorteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
