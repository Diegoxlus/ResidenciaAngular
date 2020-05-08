import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotarseFindeComponent } from './anotarse-finde.component';

describe('AnotarseFindeComponent', () => {
  let component: AnotarseFindeComponent;
  let fixture: ComponentFixture<AnotarseFindeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotarseFindeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotarseFindeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
