import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioMenuComponent } from './calendario-menu.component';

describe('CalendarioMenuComponent', () => {
  let component: CalendarioMenuComponent;
  let fixture: ComponentFixture<CalendarioMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
