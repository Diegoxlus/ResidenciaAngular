import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaParteComponent } from './alta-parte.component';

describe('AltaParteComponent', () => {
  let component: AltaParteComponent;
  let fixture: ComponentFixture<AltaParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
