import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionDeConocimientosComponent } from './calificacion-de-conocimientos.component';

describe('CalificacionDeConocimientosComponent', () => {
  let component: CalificacionDeConocimientosComponent;
  let fixture: ComponentFixture<CalificacionDeConocimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionDeConocimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionDeConocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
