import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConvocatoriaComponent } from './crear-convocatoria.component';

describe('CrearConvocatoriaComponent', () => {
  let component: CrearConvocatoriaComponent;
  let fixture: ComponentFixture<CrearConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
