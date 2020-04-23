import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMenuComponent } from './alta-menu.component';

describe('AltaMenuComponent', () => {
  let component: AltaMenuComponent;
  let fixture: ComponentFixture<AltaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
