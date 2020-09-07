import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionDeMeritosComponent } from './calificacion-de-meritos.component';

describe('CalificacionDeMeritosComponent', () => {
  let component: CalificacionDeMeritosComponent;
  let fixture: ComponentFixture<CalificacionDeMeritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionDeMeritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionDeMeritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
