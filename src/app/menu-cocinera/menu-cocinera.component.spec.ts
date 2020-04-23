import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCocineraComponent } from './menu-cocinera.component';

describe('MenuCocineraComponent', () => {
  let component: MenuCocineraComponent;
  let fixture: ComponentFixture<MenuCocineraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCocineraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCocineraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
