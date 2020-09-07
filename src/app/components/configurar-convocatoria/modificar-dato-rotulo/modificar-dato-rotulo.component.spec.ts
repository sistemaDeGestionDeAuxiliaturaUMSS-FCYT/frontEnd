import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatoRotuloComponent } from './modificar-dato-rotulo.component';

describe('ModificarDatoRotuloComponent', () => {
  let component: ModificarDatoRotuloComponent;
  let fixture: ComponentFixture<ModificarDatoRotuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDatoRotuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDatoRotuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
