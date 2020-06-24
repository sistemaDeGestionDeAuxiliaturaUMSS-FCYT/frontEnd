import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarConvocatoriaComponent } from './consultar-convocatoria.component';

describe('ConsultarConvocatoriaComponent', () => {
  let component: ConsultarConvocatoriaComponent;
  let fixture: ComponentFixture<ConsultarConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
